const WebSocket = require("ws");
const server = new WebSocket.Server({port : 1123});
server.on("connection", socket => {
    socket.on("message", message => {
        server.clientsforEach(client => {
            client.send(message);
        });
    });
});
