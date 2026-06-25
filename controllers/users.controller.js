const user = require('../model/user');


async function getAllUsers(req, res) {
  try {
    const users = await user.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}


async function getUserById(req, res) {
    try {
      const User = await user.findById(req.params.id);
      console.log(req.params.id);
      if (!User) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ message: 'internal server error', error: error.message });
    }
}

async function createUser(req, res) {
    try {
     const newUser = await user.create(req.body);
      res.status(201).json(newUser);


    } catch (error) {
        res.status(400).json({ message: 'internal server error', error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
      const deletedUser = await user.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found, for deletion' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'internal server error', error: error.message });
    }
}

module.exports = {getAllUsers, getUserById, createUser, deleteUser};