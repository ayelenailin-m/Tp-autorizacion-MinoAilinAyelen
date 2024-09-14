import { database } from "../db/database.js";

export const createTask = (title, completed, owner) => {
  database.todos.push({
    id: database.length + 1,
    title,
    completed,
    owner,
  });
};
export const updateTask = (id, title, completed, owner) => {
  const todo = database.todos.find((todo) => todo.id === id); // busca la tarea por id
  if (todo) {
    todo.title = title;
    todo.completed = completed;
    todo.owner = owner;
    return todo; // Retorna la tarea actualizada
  } else {
    console.log("Tarea no encontrada");
    return null; // Retorna null si la tarea no se encuentra
  }
};

// Eliminar una tarea
export const deleteTask = (id) => {
  const todoIndex = database.todos.findIndex((todo) => todo.id === id); // Encuentra el índice de la tarea por ID
  if (todoIndex !== -1) {
    const deletedTodo = database.todos.splice(todoIndex, 1); // Elimina la tarea del array
    return deletedTodo[0]; // Retorna la tarea eliminada
  } else {
    console.error("Tarea no encontrada");
    return null; // Retorna null si la tarea no se encuentra
  }
};
