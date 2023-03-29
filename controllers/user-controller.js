const { User, Thought } = require('../models');

const user = {

  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(UserData => res.json(UserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
 
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .then(UserData => {
        if (!UserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
 
  createUser({ body }, res) {
    User.create(body)
      .then(UserData => res.json(UserData))
      .catch(err => res.json(err));
  },
 
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(UserData => {
        if (!UserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(UserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(UserData => res.json(UserData))
      .catch(err => res.json(err));
  },
 
  deleteUser({ params }, res) {
    Thought.deleteMany({ userId: params.id })
      .then(() => {
        User.findOneAndDelete({ userId: params.id })
          .then(UserData => {
            if (!UserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(UserData);
          });
      })
      .catch(err => res.json(err));
  },
 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = user