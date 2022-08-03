import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { addTodo, editTextTodo } from "../../store/actionsCreater";

import getRandomIndex from "../../otherFunc/getRandomIndex";

import Todo from "./Todo";
import Navigation from "../navigation/Navigation";

import { InitialState } from "../../store/mainReducer";

import classes from "./Todos.module.css";

const Todos = () => {
  const dispatch = useDispatch();

  const [isActiveTodos, setIsActiveTodos] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [text, setText] = useState("");
  const [drag, setDrag] = useState({
    active: false,
    x: 0,
  });

  const [dims, setDims] = useState({
    w: 150,
  });

  const enteredText = useRef<HTMLInputElement>(null);
  const editingText = useRef<HTMLInputElement>(null);

  const todos = useSelector((state: InitialState) => {
    if (state.selectedCategory === "All") {
      return state.allTodos.filter((todo) =>
        todo.text.toLowerCase().includes(text.toLocaleLowerCase())
      );
    } else if (state.selectedCategory === "Active") {
      return state.activeTodos.filter((todo) =>
        todo.text.toLowerCase().includes(text.toLocaleLowerCase())
      );
    } else if (state.selectedCategory === "Awaiting") {
      return state.awaitingTodos.filter((todo) =>
        todo.text.toLowerCase().includes(text.toLocaleLowerCase())
      );
    } else {
      return state.completedTodos.filter((todo) =>
        todo.text.toLowerCase().includes(text.toLocaleLowerCase())
      );
    }
  });

  const selectedTodo = useSelector((state: InitialState) => state.selectedTodo);
  const allTodos = useSelector((state: InitialState) => state.allTodos);

  const boxStyle = {
    width: `${dims.w}px`,
  };

  const addTodohandler = (event: React.KeyboardEvent) => {
    if (event.code === "Enter") {
      event.preventDefault();

      const text = enteredText.current!.value;

      const index = getRandomIndex();

      if (
        allTodos.find((todo) =>
          todo.text.toLowerCase().includes(text.toLowerCase())
        )
      ) {
        setIsRepeat(true);
        return;
      }

      dispatch(addTodo({ text: text, awaiting: true, index: index }));

      enteredText.current!.value = "";
      setIsActiveTodos(true);
      setIsRepeat(false);
    }
  };

  const toggleTodosMenuHandler = () => {
    setIsActiveTodos((prev) => !prev);
  };

  const editTextTodoHandler = () => {
    const text = editingText.current!.value;

    if (!selectedTodo) {
      return;
    }

    const newTodo = {
      text: text,
      index: selectedTodo!.index,
      isActive: selectedTodo!.isActive,
      awaiting: selectedTodo!.awaiting,
    };

    dispatch(editTextTodo(newTodo));
  };

  const startResize = (event: React.MouseEvent<HTMLDivElement>) => {
    setDrag({
      active: true,
      x: event.clientX,
    });
  };

  const resizeFrame = (event: React.MouseEvent<HTMLDivElement>) => {
    const { active, x } = drag;
    const moveX = event.clientX;
    if (active) {
      const xDiff = Math.abs(x - event.clientX);
      const newWidth = x > moveX ? dims.w - xDiff : dims.w + xDiff;

      setDrag({ ...drag, x: moveX });
      setDims({ w: newWidth });
    }
  };

  const stopResize = () => {
    setDrag({ ...drag, active: false });
  };

  return (
    <div
      className={classes.container}
      onMouseMove={resizeFrame}
      onMouseUp={stopResize}
    >
      <form className={classes.form} onKeyDown={addTodohandler}>
        <img
          onClick={toggleTodosMenuHandler}
          className={
            isActiveTodos
              ? classes.form__image
              : classes.form__image + " " + classes.form__imageNonActive
          }
          src="/images/arrow.svg"
          alt="arrow"
        ></img>
        <input
          className={classes.form_input}
          ref={enteredText}
          placeholder="What needs to be done?"
        ></input>
      </form>
      {isRepeat && (
        <div className={classes.container__repeat}>
          This task already exists.
        </div>
      )}
      {isActiveTodos && (
        <div className={classes.menuTodos}>
          <div className={classes.menuTodos__todos} style={boxStyle}>
            {todos.map((todo, index) => (
              <Todo key={index} todo={todo} index={index} />
            ))}
          </div>
          <div
            className={classes.menuTodos__dragger}
            onMouseDown={startResize}
          ></div>
          <input
            type="text"
            className={classes.menuTodos__todosEditor}
            placeholder="Choose task and correct it"
            ref={editingText}
            value={selectedTodo ? selectedTodo.text : ""}
            onChange={editTextTodoHandler}
          ></input>
        </div>
      )}
      <Navigation setText={setText} />
    </div>
  );
};

export default Todos;
