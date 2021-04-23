import websocket, requests
try:
    import thread
except ImportError:
    import _thread as thread
import time, json 

def on_message(ws, message):
    
    url = "http://localhost:5005/webhooks/rest/webhook"
    msg =  json.loads(message)
    if msg['name'] != "RASA":
        print(msg)
    
        payload = 	{
	      "sender": msg['name'],
	      "message": msg['message']
	    }
        r = requests.post(url, json=payload)
        rj = r.json()[0]
        response = rj["recipient_id"] +" - "+ rj["text"]
        
        print(r.json())
        ws.send(json.dumps({ "action": "postMessage", "data": { "name": "RASA", "message": response}}))


def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    pass
    #ws.send(json.dumps({ "action": "postMessage", "data": { "name": "RASA", "message": "==RASA is now chatting=="}}))

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("wss://otmyj253a4.execute-api.us-east-1.amazonaws.com/dev",                   on_open = on_open,
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)

    ws.run_forever()


