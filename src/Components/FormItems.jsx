import React, { useState } from "react";
import { useTodo } from "../Context";
import { Trash2, Edit, Save, Check } from "lucide-react";

const FormItems = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todoMsg);
  const { updateTodo, deleteTodo, toggleTodo, allIds } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todoMsg: todoMsg });
    setIsTodoEditable(false);
  };

  const handleCheckboxChange = () => {
    toggleTodo(todo.id);

    // Preserved original checkbox logic
    if (!todo.completed) {
      if (!allIds.includes(todo.id)) {
        allIds.push(todo.id);
      }
    } else {
      const index = allIds.indexOf(todo.id);
      if (index !== -1) {
        allIds.splice(index, 1);
      }
    }
  };

  return (
    <div
      className={`group relative rounded-xl p-5 transition-all duration-300
        ${todo.completed ? "bg-emerald-50/80" : "bg-white"}
        border border-gray-200/80 hover:border-gray-300
        shadow-sm hover:shadow-md
        flex flex-col gap-4`}
      style={{ minWidth: "280px", maxWidth: "100%", wordBreak: "break-word" }}
    >
      {/* Checkbox and Text */}
      <div className="flex items-start gap-4">
        <label className="flex items-center mt-1">
          <input
            type="checkbox"
            className="hidden"
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
          <div
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center
            ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500"
                : "border-gray-300 hover:border-gray-400"
            }
            shadow-inner cursor-pointer transition-colors`}
          >
            {todo.completed && (
              <Check size={16} className="text-white stroke-[3]" />
            )}
          </div>
        </label>

        <textarea
          className={`w-full bg-transparent text-gray-700 outline-none resize-none
            text-lg font-medium transition-all duration-300
            border-b-2 pb-1 focus:pb-2
            ${
              isTodoEditable
                ? "border-emerald-400/50 focus:border-emerald-500"
                : "border-transparent"
            }
            ${
              todo.completed
                ? "line-through text-gray-400/90"
                : "text-gray-700/90"
            }
            placeholder-gray-400/80`}
          value={todoMsg}
          onChange={e => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
          rows={Math.min(todoMsg.split("\n").length + 1, 6)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          {todo.completed && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-600">
              <Check size={14} /> Selected
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {todo.completed && (
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-2 rounded-xl bg-gradient-to-br from-red-100 to-red-50
                text-red-500 hover:text-red-600 hover:from-red-200
                border border-red-200/80 shadow-inner
                transition-all duration-200 hover:scale-[1.03]"
            >
              <Trash2 size={18} strokeWidth={2.5} />
            </button>
          )}

          {/* Always visible Edit button */}
          <button
            onClick={isTodoEditable ? editTodo : () => setIsTodoEditable(true)}
            disabled={todo.completed}
            className={`p-2 rounded-xl bg-gradient-to-br 
              ${
                todo.completed
                  ? "from-gray-100 to-gray-50 text-gray-400 cursor-not-allowed"
                  : "from-blue-100 to-blue-50 text-blue-500 hover:text-blue-600 hover:from-blue-200"
              }
              border border-blue-200/80 shadow-inner
              transition-all duration-200 hover:scale-[1.03]`}
          >
            {isTodoEditable ? (
              <Save size={18} strokeWidth={2.5} />
            ) : (
              <Edit size={18} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormItems;
