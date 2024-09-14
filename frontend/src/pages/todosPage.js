export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const btnCreate = document.createElement("button");

  btnCreate.classList.add(
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-green-600",
    "mb-4"
  );

  btnCreate.textContent = "Crear";

  btnCreate.addEventListener("click", () => {
    console.log( "clikearon en crear xd");
    // Logica para crear despues
    const title = prompt("Ingresa el titulo");
    const completed = prompt("Ingresa el estado");

    if (title && completed) {
      fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          completed,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          location.reload(); // Actualiza la página para mostrar el nuevo TODO
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Complete todos los campos");
    }


  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  // Columna para editar y eliminar
  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5); // Agregar la columna de acciones

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnCreate); // Se añade el boton de crear
  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.todos.forEach((todo) => {
        //if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        // Celdas para las acciones
        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");


        // Botón para editar
        const btnEdit = document.createElement("button");
        btnEdit.classList.add("bg-blue-500", "text-white", "p-1", "rounded", "mr-2", "hover:bg-yellow-600");
        btnEdit.textContent = "Editar";
        btnEdit.dataset.todoId = todo.id; // Almacenar el ID del TODO

        // Botón para eliminar
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("bg-red-500", "text-white", "p-1", "rounded", "hover:bg-red-600");
        btnDelete.textContent = "Eliminar";
        btnDelete.dataset.todoId = todo.id; // Almacenar el ID del TODO

         // Evento para el botón Editar
        btnEdit.addEventListener("click", () => {
          console.log("Editar:", todo.id);
          // agregar la lógica para editar el todo
          const newTitle = prompt("Nuevo título del todo:", todo.title);
          const newCompleted = confirm("¿Está completado?");
  
          if (newTitle) {
              fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
              title: newTitle,
              completed: newCompleted,
              }),
              credentials: "include",
              })
              .then((response) => response.json())
              .then((data) => {
              console.log("Todo editado:", data);
              location.reload(); // Recargar la página para reflejar los cambios
            })
            .catch((error) => console.error("Error al editar todo:", error));
          } else {
          alert("Debe ingresar un título válido");
          }
        });

        // Evento para el botón Borrar
        btnDelete.addEventListener("click", () => {
          console.log("Borrar:", todo.id);
          // agregar la lógica para borrar el todo
          if (confirm("¿Está seguro de que desea borrar este todo?")) {
            fetch(`http://localhost:4000/todos/${todo.id}`, {
              method: "DELETE",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log("Todo borrado:", data);
                location.reload(); // Recargar la página para reflejar los cambios
              })
              .catch((error) => console.error("Error al borrar todo:", error));
          }
        });

        // Agregar el botón de editar y borrar a la celda de acciones
        td5.appendChild(btnEdit);
        td5.appendChild(btnDelete);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5); // Agregar la celda de acciones
        tbody.appendChild(tr);
      });
    });

  container.appendChild(title);
  container.appendChild(table);

  return container;
};
