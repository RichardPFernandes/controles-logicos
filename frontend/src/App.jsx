import { useState, useEffect } from "react";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);
  
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const addTask = (description) => {
  const csrfToken = getCookieValue("XSRF-TOKEN");
  fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken
    },
    body: JSON.stringify({ description }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao adicionar tarefa");
      }
      return response.json();
    })
    .then((newTask) => {
      setTasks([...tasks, newTask]);
    })
    .catch((error) => {
      console.error("Erro ao adicionar tarefa", error);
    });
  };
  
  const checkTask = (id) => {
      const csrfToken = getCookieValue("XSRF-TOKEN");
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "X-XSRF-TOKEN": csrfToken,
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          fetch("/api/tasks")
          .then((response) => response.json())
          .then((data) => setTasks(data));
        })
        .catch((error) => {
          console.error("Erro ao concluir tarefa", error);
        });
    };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} checkTask={checkTask} />
    </div>
  );
}

export default App;
