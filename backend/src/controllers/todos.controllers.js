import { database } from "../db/database.js";
import { createTask, deleteTask, updateTask } from "../models/todos.model.js";
import validarJwt from "../middlewares/validar-jwt.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo) => todo.owner === req.user.id)
  res.json({ todos });
};

export const createTodoCtrl = (req, res) => {
  const { title, completed, owner } = req.body;
  const newTodo = createTask(title, completed, owner);
  res.json({ newTodo });
}

export const updateTodoCtrl = (req, res) => {
  const { id } = req.params;
  const { title, completed, owner } = req.body;
  const updatedTodo = updateTask(id, title, completed, owner);
  res.json({ updatedTodo });
}

export const deleteTodoCtrl = (req, res) => {
  const { id } = req.params;
  const deletedTodo = deleteTask(id);
  res.json({ deletedTodo });
}