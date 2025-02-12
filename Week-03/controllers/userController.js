const userService = require('../services/userService');

exports.getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.json(users);
};

exports.getUser = async (req, res) => {
  
  try {
        const user = await userService.getUser(req.params.id);
        if(!user){
            return res.status(404).json({message: "User Not Found. "});
        }
        res.status(200).json(user);
  } catch (error) {
        res.status(500).json({error:"Internal Server error"});
  }

};

exports.addUser = async (req, res) => {
  const id = await userService.addUser(req.body);
  res.json({ id });
};

exports.updateUser = async (req, res) => {
  await userService.updateUser(req.params.id, req.body);
  res.sendStatus(200);
};

exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.sendStatus(200);
};
