# Chat server

This is a simple chat server that listens on a web socket

## Usage

Just connect using a web socket client. The server understands the following JSON messages

```json
{
    "action": "postMessage",
    "data": {
        "name": "User name",
        "message": "Message content"
    }
}
```

to send a message to all users in the channel.

After connecting the connection is kept alive for 60 minutes. The connection is renewed for 60 minutes when sending a message. To renew the connection without sending a message send the following keep alive message:

```json
{
    "action": "keepAlive"
}
```