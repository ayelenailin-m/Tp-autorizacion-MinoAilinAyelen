import { database } from "../db/database.js";

export const createTask = ( title, completed, owner ) => {
    database.push({
        id: database.length + 1,
        title,
        completed,
        owner
    });
}
export const updateTask = ( id, title, completed, owner ) => {
    const todo = database.find((todo) => todo.id === id);
    todo.title = title;
    todo.completed = completed;
    todo.owner = owner;
}

export const deleteTask = ( id ) => {
    const todo = database.find((todo) => todo.id === id);
    database.splice(database.indexOf(todo), 1);
}
