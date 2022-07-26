type Payload = {
    text: string,
    isActive: boolean,
    index?: any
}

export const addTodo = (payload: Payload) => {
    return {
        type: 'ADD_TODO',
        todo: payload,
    }
}

export const setCompleted = (payload: Payload) => {
    return {
        type: 'SET_COMPLETED',
        todo: payload
    }
}

export const filterActiveCategory = () => {
    return {
        type: 'FILTER_ACTIVE'
    }
}

export const filterCompletedCategory = () => {
    return {
        type: 'FILTER_COMPLETED'
    }
}

export const showAllCategories = () => {
    return {
        type: 'SHOW_ALL_CATEGORIES'
    }
}

export const clearCompletedTodos = () => {
    return {
        type: 'CLEAR_COMPLETED'
    }
}