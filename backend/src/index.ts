import { WebSocketServer, WebSocket } from 'ws';

import express, { Express, Request, Response } from "express";


const app: Express = express();


app.get('/', (req, res) => {
    res.send("Hello");
})


const httpServer = app.listen(4040, () => {
    console.log("listening")
});



const wss = new WebSocketServer({ port : 4041 });


let c: number = 0;

wss.on('connection', function connection(ws) {




    console.log("connection ", ++c)
    ws.on('error', console.error);

    
    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN){
                client.send(data, {binary :  isBinary})
            }
        });
        console.log('received: %s', data);
    });

    ws.send('something');
});