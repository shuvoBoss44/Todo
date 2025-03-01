import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todoMsg: "hello",
            completed: false
        }
    ],
    allIds: [],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggleTodo: (id) => { },
})

export const useTodo = () => {
    return useContext(TodoContext);
}

export const ContextProvider = TodoContext.Provider;