import classes from './Todo.module.css'

import { setCompleted } from '../store/actionsCreater'
import { useDispatch } from 'react-redux'

const Todo: React.FC<{ todo: { text: string, isActive: boolean }, index: number }> = (props) => {

    const dispatch = useDispatch();

    const setTodoDone = (todo: { text: string, isActive: boolean }) => {
        dispatch(setCompleted(todo))
    }

    return (
        <div className={classes.todo}>
            <img onClick={() => setTodoDone(props.todo)} className={classes.image} src={props.todo.isActive ? "/images/circle.svg" : "/images/done.svg"} alt='circle'></img>
            <span className={props.todo.isActive ? classes.text : (classes.text + ' ' + classes.completedTodo)}>{props.todo.text}</span>
        </div>
    )
}

export default Todo;