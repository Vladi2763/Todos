type Todo = {
    text: string,
    index: number,
    isActive: boolean
}

type Action = {
    todo: {
        text: string,
        index: number,
        isActive: boolean
    },
    type: string,
    index: number
}

export type InitialState = {
    allTodos: Array<Todo>,
    activeTodos: Array<Todo>,
    completedTodos: Array<Todo>,
    selectedCategory: string
}


const initialState: InitialState = {
    allTodos: [],
    activeTodos: [],
    completedTodos: [],
    selectedCategory: 'All'
}

const mainReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'ADD_TODO': {

            const newTodos = state.allTodos.concat(action.todo)

            const activeTodos = state.activeTodos.concat(action.todo)

            return {
                ...state,
                allTodos: [...newTodos],
                activeTodos: [...activeTodos]
            }
        }

        case 'SET_COMPLETED': {

            const newTodos = state.allTodos;

            const newTodo = {
                ...action.todo,
                isActive: false
            }

            const index = newTodos.findIndex((todo) => todo.index === newTodo.index)

            const activeTodos = state.activeTodos.filter((todo) => todo.index !== newTodo.index)

            newTodos[index] = newTodo;

            const completedTodos = state.completedTodos.concat(newTodo);

            return {
                ...state,
                allTodos: [...newTodos],
                activeTodos: [...activeTodos],
                completedTodos: [...completedTodos]
            }
        }

        case 'FILTER_ACTIVE': {

            return {
                ...state,
                selectedCategory: 'Active',
            }
        }

        case 'FILTER_COMPLETED': {

            return {
                ...state,
                selectedCategory: 'Completed',
            }
        }

        case 'SHOW_ALL_CATEGORIES': {

            return {
                ...state,
                selectedCategory: 'All',
            }
        }

        case 'CLEAR_COMPLETED': {

            const newTodos = state.allTodos.filter((todo) => todo.isActive !== false)

            return {
                ...state,
                allTodos: [...newTodos],
                completedTodos: []
            }
        }

        default: {
            return state;
        }
    }
}

export default mainReducer