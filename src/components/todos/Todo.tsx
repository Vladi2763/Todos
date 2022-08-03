import classes from "./Todo.module.css";

import { Todo as TodoType, InitialState } from "../../store/mainReducer";

import { toggleStatus, selectTodo } from "../../store/actionsCreater";
import { useDispatch, useSelector } from "react-redux";

const Todo: React.FC<{
  todo: TodoType;
  index: number;
}> = (props) => {
  const dispatch = useDispatch();

  const selectedTodo = useSelector((state: InitialState) => state.selectedTodo);

  const clickSelectTodoHandler = (todo: TodoType) => {
    dispatch(selectTodo(todo));
  };

  const toggleTodoStatus = (
    todo: TodoType,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    dispatch(toggleStatus(todo));
  };

  return (
    <div
      className={
        classes.todo +
        " " +
        (props.todo.index === selectedTodo?.index ? classes.selectedTodo : "")
      }
      onClick={() => clickSelectTodoHandler(props.todo)}
    >
      <img
        onClick={(event) => toggleTodoStatus(props.todo, event)}
        className={classes.todo__image}
        src={
          props.todo.awaiting
            ? "/images/circle.svg"
            : props.todo.isActive
            ? "/images/inprogress.svg"
            : "/images/done.svg"
        }
        alt="circle"
      ></img>
      <span
        className={
          props.todo.awaiting
            ? classes.todo__text
            : props.todo.isActive
            ? classes.todo__text + " " + classes.todo__inprogress
            : !props.todo.isActive
            ? classes.todo__text + " " + classes.todo__completed
            : classes.todo__text
        }
      >
        {props.todo.text}
      </span>
    </div>
  );
};

export default Todo;
