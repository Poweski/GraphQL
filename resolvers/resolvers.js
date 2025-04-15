const User = require('../models/User');
const ToDoItem = require('../models/ToDoItem');

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    todos: async () => await ToDoItem.find(),
    todo: async (_, { id }) => await ToDoItem.findById(id),
  },

  User: {
    todos: async (parent) => await ToDoItem.find({ user_id: parent.id }),
  },

  ToDoItem: {
    user: async (parent) => await User.findById(parent.user_id),
  },

  Mutation: {
    addUser: async (_, { name, email, login }) => {
      const newUser = new User({ name, email, login });
      return await newUser.save();
    },
    updateUser: async (_, { id, name, email, login }) => {
      return await User.findByIdAndUpdate(
        id,
        { name, email, login },
        { new: true }
      );
    },
    deleteUser: async (_, { id }) => {
      await ToDoItem.deleteMany({ user_id: id });
      return await User.findByIdAndDelete(id);
    },

    addTodo: async (_, { title, completed, user_id }) => {
      const newTodo = new ToDoItem({ title, completed, user_id });
      return await newTodo.save();
    },
    updateTodo: async (_, { id, title, completed }) => {
      return await ToDoItem.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true }
      );
    },
    deleteTodo: async (_, { id }) => {
      return await ToDoItem.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
