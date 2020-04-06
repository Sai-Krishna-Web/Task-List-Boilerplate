import React from "react";

import TodoInput from "./TodoInput";
import TodoPrivateList from "./TodoPrivateList";

const TodoPrivateWrapper = () => {
  return (
    <div className="todoWrapper">
      <div className="sectionHeader">Personal Tasks</div>

      <TodoInput />
      <TodoPrivateList />
    </div>
  );
};

export default TodoPrivateWrapper;
