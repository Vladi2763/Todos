import Todos from "./Todos";

import classes from './Main.module.css'

const Main = () => {
    return (
        <main className={classes.main}>
            <span className={classes.title}>Todos</span>
            <Todos />
        </main>
    )
}

export default Main;