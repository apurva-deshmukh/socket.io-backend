var io = require("socket.io")();

let currentUserId = 2;
const userIds = {};
let currentMessageId = 1;

function createMessage(userId, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: "Test User",
      avatar: "https://placeimg.com/140/140/any",
    },
  };
}

io.on("connection", (socket) => {
  console.log("connected");
  console.log(socket.id);
  userIds[socket.id] = currentUserId++;
  socket.on("message", (messageText) => {
    const userId = userIds[socket.id];
    const message = createMessage(userId, messageText);
    console.log(message);
    socket.broadcast.emit("message", message);
  });
});

io.listen(3001);
