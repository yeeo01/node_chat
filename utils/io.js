const chatController = require("../controllers/chat.controllers"); //컨트롤러 함수 가져오기
const userController = require("../controllers/user.controllers");

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      try {
        const user = await userController.saveUser(userName, socket.id);
        const welcomeMessage = {
          chat: `${user.name}님이 채팅방에 입장했습니다.`,
          user: { id: null, name: "system" },
        };
        io.emit("message", welcomeMessage); //시스템 메세지를 클라이언트에게 전송
        cb({ ok: true, data: user });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("sendMessage", async (message, cb) => {
      try {
        // user를 socket.id로 찾기
        const user = await userController.checkUser(socket.id);
        //메세지 저장
        const newmessage = await chatController.savechat(message, user);
        io.emit("message", newmessage);
        cb({ ok: true });
      } catch (error) {
        cb({ ok: false, error: error.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("client is disconnect");
    });
  });
};
