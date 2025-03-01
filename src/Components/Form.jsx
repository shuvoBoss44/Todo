import React, { useState } from "react";
import { useTodo } from "../Context";
import { Plus } from "lucide-react";

const Form = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = e => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todoMsg: todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex flex-col gap-4 p-6 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl max-w-2xl mx-auto border border-gray-200/80"
    >
      {/* Enhanced Textarea */}
      <div className="relative">
        <textarea
          placeholder="What needs to be done today?"
          className="w-full border-2 border-gray-200 rounded-xl px-5 py-3 pr-12
                   focus:border-blue-400 focus:ring-4 focus:ring-blue-100 
                   transition-all duration-300 resize-y
                   text-gray-800 font-medium placeholder-gray-400/90
                   hover:border-gray-300 min-h-[80px] max-h-[200px]
                   shadow-sm focus:shadow-blue-100/30"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          rows={2}
          maxLength={500}
        />
        <div className="absolute right-4 top-4 bg-gray-100/50 px-2 py-1 rounded-lg text-sm text-gray-500">
          {todo.length}/500
        </div>
      </div>

      {/* Enhanced Add Button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 
                 bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                 font-semibold shadow-lg hover:shadow-xl 
                 transition-all hover:scale-[1.02] hover:from-green-600 hover:to-emerald-700
                 active:scale-95"
      >
        <Plus size={18} className="stroke-[2.5]" />
        Add Task
      </button>
    </form>
  );
};

export default Form;
