import classes from "./SearchByName.module.css";
import { useRef } from "react";

const SearchByName: React.FC<{ setText: (arg0: string) => void }> = (props) => {
  const enteredText = useRef<HTMLInputElement>(null);

  const searchByTaskNameHandler = () => {
    props.setText(enteredText.current!.value);
  };

  return (
    <div className={classes.search}>
      <label className={classes.search__label}>Search Task</label>
      <input
        onChange={searchByTaskNameHandler}
        className={classes.search__input}
        type="text"
        placeholder="Enter Task name"
        ref={enteredText}
      ></input>
    </div>
  );
};

export default SearchByName;
