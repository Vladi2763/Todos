import { useDispatch, useSelector } from 'react-redux';
import classes from './Navigation.module.css'

import { filterActiveCategory, filterCompletedCategory, showAllCategories, clearCompletedTodos } from '../store/actionsCreater';

import { InitialState } from '../store/mainReducer';

const Navigation = () => {

    const dispatch = useDispatch()
    const selectedCategory = useSelector((state: InitialState) => state.selectedCategory)
    const activeItems = useSelector((state: InitialState) => state.activeTodos.length)


    const filterActiveCategoryHandler = () => {
        dispatch(filterActiveCategory())
    }

    const filterCompletedCategoryHandler = () => {
        dispatch(filterCompletedCategory())
    }

    const showAllCategoriesHandler = () => {
        dispatch(showAllCategories())
    }

    const clearCompletedTodosHandler = () => {
        dispatch(clearCompletedTodos())
    }
    return (
        <div className={classes.navigation}>
            <div>
                <span>{activeItems} items left</span>
            </div>
            <div className={classes.categories}>
                <div onClick={showAllCategoriesHandler} className={selectedCategory === 'All' ? (classes.category + ' ' + classes.selectedCategory) : classes.category}>All</div>
                <div onClick={filterActiveCategoryHandler} className={selectedCategory === 'Active' ? (classes.category + ' ' + classes.selectedCategory) : classes.category}>Active</div>
                <div onClick={filterCompletedCategoryHandler} className={selectedCategory === 'Completed' ? (classes.category + ' ' + classes.selectedCategory) : classes.category}>Completed</div>
            </div>
            <div className={classes.clearing} onClick={clearCompletedTodosHandler}>Clear Completed</div>
        </div>
    )
}

export default Navigation;