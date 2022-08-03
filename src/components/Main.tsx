import Todos from "./todos/Todos";

import classes from "./Main.module.css";

const Main = () => {
  return (
    <main className={classes.main}>
      <span className={classes.main__title}>Todos</span>
      <Todos />
    </main>
  );
};

export default Main;
