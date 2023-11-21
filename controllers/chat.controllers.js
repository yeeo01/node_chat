const Chat = require("../Models/chat");
const chatController = {};

chatController.savechat = async (message, user) => {
  const newmessage = new Chat({
    chat: message,
    user: {
      id: user._id,
      name: user.name,
    },
  });
  await newmessage.save();
  return newmessage;
};

module.exports = chatController;
