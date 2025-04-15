const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('ToDoItem', todoItemSchema);
