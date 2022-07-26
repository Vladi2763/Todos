import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { addTodo } from "../store/actionsCreater";

import getRandomIndex from "../otherFunc/getRandomIndex";

import Todo from "./Todo";
import Navigation from "./Navigation";

import { InitialState } from "../store/mainReducer";

import classes from './Todos.module.css'

const Todos = () => {

    const dispatch = useDispatch();

    const [isActiveTodos, setIsActiveTodos] = useState(true);

    const enteredText = useRef<HTMLInputElement>(null);

    const todos = useSelector((state: InitialState) => {
        if (state.selectedCategory === 'All') {
            return state.allTodos
        } else if(state.selectedCategory === 'Active'){
            return state.activeTodos
        } else {
            return state.completedTodos
        }
    })

    const addTodohandler = (event: React.KeyboardEvent) => {
        if (event.code === 'Enter') {
            event.preventDefault();

            const text = enteredText.current!.value;

            const index = getRandomIndex();

            dispatch(addTodo({ text: text, isActive: true, index: index }))

            enteredText.current!.value = '';
        }
    }

    const toggleTodosMenuHandler = () => {
        setIsActiveTodos((prev) => !prev)
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onKeyDown={addTodohandler}>
                <img onClick={toggleTodosMenuHandler} className={isActiveTodos ? classes.image : (classes.image + ' ' + classes.imageNonActive)} src='/images/arrow.svg' alt='arrow'></img>
                <input className={classes.input} ref={enteredText} placeholder="What needs to be done?"></input>
            </form>
            {isActiveTodos && <div className={classes.todos}>
                {todos.map((todo, index) => (
                    <Todo key={index} todo={todo} index={index} />
                ))}
            </div>
            }
            <Navigation />
        </div>

    )
}

export default Todos;