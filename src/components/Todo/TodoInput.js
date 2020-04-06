import React,{useState} from "react";
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import {GET_MY_TODOS} from './TodoPrivateList';
const ADD_TODO=gql`
 mutation($todo: String!, $isPublic:Boolean!) {
 insert_todos(objects: {is_public: $isPublic, title: $todo}){
  affected_rows
  returning {
    id
    title
    created_at
    is_completed
  }
 }
}
 `;

const TodoInput = ({ isPublic = false }) => {

  let input;
  const [todoInput, setTodoInput]=useState('');

  const updateCache=(cache,{data})=>{
    if(isPublic){
      return null;
    }
    const existingTodos=cache.readQuery({
      query:GET_MY_TODOS
    });
    const newTodo=data.insert_todos.returning[0];
    cache.writeQuery({
      query:GET_MY_TODOS,
      data:{todos:[newTodo, ...existingTodos.todos]}
    });
  };

  const resetInput=()=>{
    setTodoInput('');
  };

  const [addTodo] = useMutation(ADD_TODO,{
    update:updateCache,
    onCompleted: resetInput
  });

  return (
    <form
      className="formInput"
      onSubmit={e => {
        e.preventDefault();
        addTodo({variables: {todo: todoInput, isPublic }});

      }}
    >
      <input className="input" placeholder="What needs to be done?" 
        value={todoInput}
        onChange={e=>(setTodoInput(e.target.value))}
        ref={n=>(input=n)}
        />
      <i className="inputMarker fa fa-angle-right" />
    </form>
  );
};

export default TodoInput;
