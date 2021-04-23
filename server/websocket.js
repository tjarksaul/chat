//Handler for websocket.
//Serverless will deploy this as a lambda function
//Serverless config should be defined to run the "handler" func here, and route for different cases.
//stolen from: https://blog.neverendingqs.com/2019/07/01/serverless-websocket-example.html

exports.handler = async function(event, context) {
  const { requestContext: { routeKey }} = event;
  switch(routeKey) {
    case '$connect':
      ...
      break;

    case '$disconnect':
      ...
      break;

    case 'routeA':
      ...
      break;

    case '$default':
    default:
      ...
  }

  // Return a 200 status to tell API Gateway the message was processed
  // successfully.
  // Otherwise, API Gateway will return a 500 to the client.
  return { statusCode: 200 };
}
