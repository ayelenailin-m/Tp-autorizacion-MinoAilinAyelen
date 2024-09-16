import { database } from "../db/database.js";
import { createTask, deleteTask, updateTask } from "../models/todos.model.js";
import validarJwt from "../middlewares/validar-jwt.js";

export const getAllTodosCtrl = (req, res) => {
  console.log(req.user.id);
  const todos = database.todos.filter((todo) => todo.owner === req.user.id);
  res.json({ todos });
};

export const createTodoCtrl = (req, res) => {
  const { title, completed } = req.body;

  const owner = req.user.id; // el usuario autenticado es el dueño de la tarea
  const newTodo = createTask(title.trim(), completed, owner);

  res.json({ newTodo });
};

export const updateTodoCtrl = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const owner = req.user.id;

  // Verificar que la tarea existe y pertenece al usuario
  const todo = database.todos.find(
    (todo) => todo.id === parseInt(id) && todo.owner === owner
  );

  if (!todo) {
    return res
      .status(404)
      .json({
        message: "Tarea no encontrada o no tienes permiso para editarla",
      });
  }

  const updatedTodo = updateTask(parseInt(id), title.trim(), completed, owner);
  res.json({ updatedTodo });
};

export const deleteTodoCtrl = (req, res) => {
  const { id } = req.params;
  const owner = req.user.id;

  // Verificar que la tarea existe y pertenece al usuario
  const todo = database.todos.find(
    (todo) => todo.id === parseInt(id) && todo.owner === owner
  );

  if (!todo) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  // Eliminar la tarea
  const deletedTodo = deleteTask(parseInt(id));
  res.json({ deletedTodo });
};
