const AWS = require('aws-sdk')
const apig = new AWS.ApiGatewayManagementApi({
  endpoint: process.env.APIG_ENDPOINT
})
const dynamodb = new AWS.DynamoDB.DocumentClient()

const connectionTable = process.env.CONNECTIONS_TABLE

async function sendMessage(connectionId, body) {
  try {
    await apig.postToConnection({
      ConnectionId: connectionId,
      Data: body
    }).promise()
  } catch (err) {
    // Ignore if connection no longer exists
    if (err.statusCode !== 400 && err.statusCode !== 410) {
      throw err
    }
  }
}

async function getAllConnections(ExclusiveStartKey) {
  const { Items, LastEvaluatedKey } = await dynamodb.scan({
    TableName: connectionTable,
    AttributesToGet: ['connectionId'],
    ExclusiveStartKey
  }).promise()

  const connections = Items.map(({ connectionId }) => connectionId)
  if (LastEvaluatedKey) {
    connections.push(...await getAllConnections(LastEvaluatedKey))
  }

  return connections
}

function parseMessage(receivedMessage) {
  const parsedBody = JSON.parse(receivedMessage)
  const { data } = parsedBody

  const { name, message } = data
  return JSON.stringify({ name, message })
}

async function messageHandler(message) {
  const sendData = parseMessage(message)

  const connections = await getAllConnections()
  await Promise.all(
    connections.map(connectionId => sendMessage(connectionId, sendData))
  )
}

async function saveConnectionId(connectionId) {
  await dynamodb.put({
    TableName: connectionTable,
    Item: {
      connectionId,
      // Expire the connection an hour later. This is optional, but recommended.
      // You will have to decide how often to time out and/or refresh the ttl.
      ttl: parseInt((Date.now() / 1000) + 3600)
    }
  }).promise()
}

async function deleteConnectionId(connectionId) {
  await dynamodb.delete({
    TableName: connectionTable,
    Key: { connectionId }
  }).promise()
}

exports.handler = async function (event, context) {
  const { body, requestContext: { routeKey, connectionId } } = event

  switch (routeKey) {
    case '$connect':
      saveConnectionId(connectionId)
      break

    case '$disconnect':
      deleteConnectionId(connectionId)
      break

    case 'postMessage':
      await messageHandler(body)
      break

    case 'keepAlive':
      await saveConnectionId(connectionId)
      break
  }

  // Return a 200 status to tell API Gateway the message was processed
  // successfully.
  // Otherwise, API Gateway will return a 500 to the client.
  return { statusCode: 200 }
}