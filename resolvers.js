const axios = require("axios");

async function getRestUsersList() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data.map(({ id, name, email, username }) => ({
      id: id,
      name: name,
      email: email,
      login: username,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Unable to fetch users.");
  }
}

async function getRestTodosList() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    return response.data.map(({ id, title, completed, userId }) => ({
      id: id,
      title: title,
      completed: completed,
      user_id: userId,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Unable to fetch todos.");
  }
}

async function todoById(parent, args, context, info) {
  const todos = await getRestTodosList();
  return todos.find(t => t.id == args.id);
}

async function userById(parent, args, context, info) {
  const users = await getRestUsersList();
  return users.find(u => u.id == args.id);
}

const resolvers = {
  Query: {
    users: async () => await getRestUsersList(),
    todos: async () => await getRestTodosList(),
    todo: todoById,
    user: userById,
  },

  User: {
    todos: async (parent, args, context, info) => {
      const todos = await getRestTodosList();
      return todos.filter(t => t.user_id == parent.id);
    },
  },

  ToDoItem: {
    user: async (parent, args, context, info) => {
      const users = await getRestUsersList();
      return users.find(u => u.id == parent.user_id);
    },
  },
};

module.exports = resolvers;
