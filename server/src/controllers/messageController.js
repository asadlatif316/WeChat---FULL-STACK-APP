const sendMessage = async (req, res) => {
  res.json('send message');
};

const getMessageById = async (req, res) => {
  res.json('get message');
};

export { sendMessage, getMessageById };
