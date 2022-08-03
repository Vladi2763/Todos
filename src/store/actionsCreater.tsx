import { Todo } from "./mainReducer";

type Payload = {
  text: string;
  isActive: boolean;
  index?: any;
};

export const addTodo = (payload: {
  text: string;
  awaiting: boolean;
  index: string;
}) => {
  return {
    type: "ADD_TODO",
    todo: payload,
  };
};

export const toggleStatus = (payload: Payload) => {
  return {
    type: "TOGGLE_STATUS",
    todo: payload,
  };
};

export const filterActiveCategory = () => {
  return {
    type: "FILTER_ACTIVE",
  };
};

export const filterCompletedCategory = () => {
  return {
    type: "FILTER_COMPLETED",
  };
};

export const filterAwaitingCategory = () => {
  return {
    type: "FILTER_AWAITING",
  };
};

export const showAllCategories = () => {
  return {
    type: "SHOW_ALL_CATEGORIES",
  };
};

export const clearCompletedTodos = () => {
  return {
    type: "CLEAR_COMPLETED",
  };
};

export const selectTodo = (todo: Todo) => {
  return {
    type: "SELECT_TODO",
    todo: todo,
  };
};

export const editTextTodo = (todo: Todo) => {
  return {
    type: "EDIT_TEXT_TODO",
    todo: todo,
  };
};
