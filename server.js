require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const URL = process.env.FRONTEND_URL || "http://localhost:3000";
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Connection = require("./backend/db/db")
const {getDocumet,updateDocument}  = require("./backend/controllers/document-controller")
Connection()
const io = new Server(server,{
    cors:{
        origin:  process.env.FRONTEND_URL || "http://localhost:3000"
    },
    method: ['GET','POST']
});
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
    socket.on('get-document',async documentId => {
        const document = await getDocumet(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)
        socket.on('send-changes',delta=> {
            socket.broadcast.to(documentId).emit('receive-changes',delta)
        })
        socket.on('save-document',async data=> {
            await updateDocument(documentId,data)
        })
    })
  console.log("connected");
});

server.listen(PORT, () => {
  console.log("listening on *:5000");
});
