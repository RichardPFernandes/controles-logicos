import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => { 
    e.preventDefault();
    addTask(description);
    setDescription("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Nova Task"
        required
      />
      <button type="submit">Adicionar Task</button>
    </form>
  );
}

export default TaskForm;
