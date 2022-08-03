import { useDispatch, useSelector } from "react-redux";
import classes from "./Navigation.module.css";

import SearchByName from "./SearchByName";

import {
  filterActiveCategory,
  filterCompletedCategory,
  showAllCategories,
  clearCompletedTodos,
  filterAwaitingCategory,
} from "../../store/actionsCreater";

import { InitialState } from "../../store/mainReducer";

const Navigation: React.FC<{ setText: (arg0: string) => void }> = (props) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: InitialState) => state.selectedCategory
  );
  const activeItems = useSelector(
    (state: InitialState) => state.activeTodos.length
  );

  const filterActiveCategoryHandler = () => {
    dispatch(filterActiveCategory());
  };

  const filterCompletedCategoryHandler = () => {
    dispatch(filterCompletedCategory());
  };

  const filterAwaitingCategoryHandler = () => {
    dispatch(filterAwaitingCategory());
  };

  const showAllCategoriesHandler = () => {
    dispatch(showAllCategories());
  };

  const clearCompletedTodosHandler = () => {
    dispatch(clearCompletedTodos());
  };
  return (
    <div className={classes.navigation}>
      <div className={classes.menu}>
        <div>
          <span>{activeItems} items left</span>
        </div>
        <div className={classes.menu__categories}>
          <div
            onClick={showAllCategoriesHandler}
            className={
              selectedCategory === "All"
                ? classes.menu__category + " " + classes.menu__category_selected
                : classes.menu__category
            }
          >
            All
          </div>
          <div
            onClick={filterActiveCategoryHandler}
            className={
              selectedCategory === "Active"
                ? classes.menu__category + " " + classes.menu__category_selected
                : classes.menu__category
            }
          >
            Active
          </div>
          <div
            onClick={filterAwaitingCategoryHandler}
            className={
              selectedCategory === "Awaiting"
                ? classes.menu__category + " " + classes.menu__category_selected
                : classes.menu__category
            }
          >
            Awaiting
          </div>
          <div
            onClick={filterCompletedCategoryHandler}
            className={
              selectedCategory === "Completed"
                ? classes.menu__category + " " + classes.menu__category_selected
                : classes.menu__category
            }
          >
            Completed
          </div>
        </div>
        <div
          className={classes.menu__clearing}
          onClick={clearCompletedTodosHandler}
        >
          Clear Completed
        </div>
      </div>
      <SearchByName setText={props.setText} />
    </div>
  );
};

export default Navigation;
