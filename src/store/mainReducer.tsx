import toggleTodoStatus from "../otherFunc/toggleTodoStatus";

export type Todo = {
  text: string;
  index: number;
  isActive: boolean;
  awaiting: boolean;
};

type Action = {
  todo: Todo;
  type: string;
  index: number;
  text: string;
};

export type InitialState = {
  allTodos: Array<Todo>;
  activeTodos: Array<Todo>;
  awaitingTodos: Array<Todo>;
  completedTodos: Array<Todo>;
  selectedCategory: string;
  selectedTodo: Todo | null;
};

const initialState: InitialState = {
  allTodos: [],
  activeTodos: [],
  awaitingTodos: [],
  completedTodos: [],
  selectedCategory: "All",
  selectedTodo: null,
};

const mainReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodos = state.allTodos.concat(action.todo);

      const activeTodos = newTodos.filter(
        (todo) => todo.isActive !== false && !todo.awaiting
      );

      const completedTodos = newTodos.filter(
        (todo) => todo.isActive !== true && !todo.awaiting
      );

      const awaitingTodos = newTodos.filter((todo) => todo.awaiting !== false);

      return {
        ...state,
        allTodos: [...newTodos],
        activeTodos: [...activeTodos],
        awaitingTodos: [...awaitingTodos],
        completedTodos: [...completedTodos],
      };
    }

    case "TOGGLE_STATUS": {
      const newTodos = state.allTodos;

      const newTodo = toggleTodoStatus(action.todo);

      const index = newTodos.findIndex((todo) => todo.index === newTodo.index);

      newTodos[index] = newTodo;

      const activeTodos = newTodos.filter(
        (todo) => todo.isActive !== false && !todo.awaiting
      );

      const completedTodos = newTodos.filter(
        (todo) => todo.isActive !== true && !todo.awaiting
      );

      const awaitingTodos = newTodos.filter((todo) => todo.awaiting !== false);

      return {
        ...state,
        allTodos: [...newTodos],
        activeTodos: [...activeTodos],
        awaitingTodos: [...awaitingTodos],
        completedTodos: [...completedTodos],
        selectedTodo: newTodo,
      };
    }

    case "FILTER_ACTIVE": {
      return {
        ...state,
        selectedCategory: "Active",
      };
    }

    case "FILTER_COMPLETED": {
      return {
        ...state,
        selectedCategory: "Completed",
      };
    }

    case "FILTER_AWAITING": {
      return {
        ...state,
        selectedCategory: "Awaiting",
      };
    }

    case "SHOW_ALL_CATEGORIES": {
      return {
        ...state,
        selectedCategory: "All",
      };
    }

    case "CLEAR_COMPLETED": {
      const newTodos = state.allTodos.filter((todo) => todo.isActive !== false);

      return {
        ...state,
        allTodos: [...newTodos],
        completedTodos: [],
      };
    }

    case "SELECT_TODO": {
      return {
        ...state,
        selectedTodo: action.todo,
      };
    }

    case "EDIT_TEXT_TODO": {
      const newTodo = action.todo;

      if (action.todo.isActive || action.todo.awaiting) {
        const newTodos = state.allTodos;

        const index = newTodos.findIndex(
          (todo) => todo.index === newTodo.index
        );

        newTodos[index] = newTodo;

        const newActiveTodos: Array<Todo> = newTodos.filter(
          (todo) => todo.isActive
        );

        return {
          ...state,
          allTodos: [...newTodos],
          activeTodos: [...newActiveTodos],
          selectedTodo: action.todo,
        };
      }

      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default mainReducer;
