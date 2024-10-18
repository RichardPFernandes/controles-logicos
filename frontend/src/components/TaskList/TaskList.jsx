import React from "react";

function TaskList({ checkTask, tasks }) {


  return (
    <ul className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => <li key={task.id}><input type="checkbox" onChange={() => checkTask(task.id)} />{task.description}</li>)
      ) : (
        <div className="no-tasks">Nenhuma tarefa cadastrada</div>
      )}
    </ul>
  );
}

export default TaskList;
