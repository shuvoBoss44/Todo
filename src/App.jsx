import React, { useState, useEffect } from "react";
import { ContextProvider } from "./Context";
import { Form, FormItems } from "./Components";
import { Inbox, Trash2 } from "lucide-react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [allIds, setAllIds] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = todo =>
    setTodos(prev => [{ id: Date.now(), ...todo }, ...prev]);

  const deleteTodo = id => {
    setTodos(prev => {
      const updatedTodos = prev.filter(todo => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setAllIds(prev => prev.filter(todoId => todoId !== id));
  };
  const updateTodo = (id, updatedTodo) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };
  const toggleTodo = id =>
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const deleteAll = () => {
    setTodos(prev => {
      const filteredTodos = prev.filter(todo => !allIds.includes(todo.id));
      localStorage.setItem("todos", JSON.stringify(filteredTodos));
      return filteredTodos;
    });
    setAllIds([]);
  };

  return (
    <ContextProvider
      value={{
        todos,
        allIds,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
      }}
    >
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex-grow w-full">
          <div className="mb-16 text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Todo
            </h1>
            <p className="text-slate-300 text-lg font-medium italic">
              Where productivity meets elegance
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-5">
            <Form />
          </div>

          {todos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {todos.map(todo => (
                  <div
                    key={todo.id}
                    className="opacity-100 transition-opacity duration-300"
                  >
                    <FormItems todo={todo} />
                  </div>
                ))}
              </div>

              {allIds.length > 0 && (
                <div className="flex justify-center animate-slide-up my-5">
                  <button
                    onClick={deleteAll}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl font-semibold 
                             text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Trash2 size={18} className="stroke-[2.5]" />
                    Clear Selected ({allIds.length})
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 animate-fade-in">
              <div className="inline-block bg-white/5 rounded-2xl p-8 border border-dashed border-white/10">
                <Inbox size={48} className="mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium text-slate-200 mb-2">
                  Your todo list is empty
                </h3>
                <p className="text-slate-400">
                  Click above to add your first task
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-auto">
          <p className="text-white text-center italic">Developed by - Shuvo</p>
        </footer>
      </div>
    </ContextProvider>
  );
};

export default App;
