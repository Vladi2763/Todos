const toggleTodoStatus = (todo) => {
  if (todo.isActive) {
    return {
      ...todo,
      isActive: false,
    };
  }

  if (!todo.isActive) {
    return {
      ...todo,
      awaiting: false,
      isActive: true,
    };
  }
};

export default toggleTodoStatus;
