"use client";
import { useState } from "react";
import useTaskStore from "@/store/useTaskStore";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function TaskList({ allData }) {
  const { editTask, deleteTask, toggleTaskCompleted } = useTaskStore();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditStart = (id, currentTitle) => {
    setEditingId(id);
    setEditText(currentTitle);
  };

  const handleEditSave = async (id) => {
    if (!editText.trim()) return;
    await editTask(id, editText);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <ul className={"w-full max-w-3xl mx-auto px-2 py-4 sm:px-4"}>
      {allData.map((task) => (
        <li
          key={task.id}
          className="border-b py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center px-2 sm:px-4"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompleted(task.id, !task.completed)}
            className="mr-3 w-5 h-5 accent-orange-900 cursor-pointer"
          />
          {editingId === task.id ? (
            <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
              <Input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="border  border-red-900 px-2 py-1 rounded w-full sm:w-3/4 text-orange-900 bg-white"
              />
              <div className="flex gap-4 mt-2 sm:mt-0">
                <Button
                  onClick={() => handleEditSave(task.id)}
                  text="Save"
                  className="px-3 py-1 bg-orange-200 text-orange-900 rounded-md text-xs sm:text-sm"
                />
                <Button
                  onClick={handleEditCancel}
                  text="Cancel"
                  className="px-3 py-1 bg-red-900 text-orange-100 rounded-md text-xs sm:text-sm"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full">
              <span
                className={`text-orange-900 text-base font-bold sm:text-base w-full sm:w-3/4 truncate  transition-all duration-300 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>

              <div className="flex gap-4 mt-2 sm:mt-0">
                <Button
                  onClick={() => handleEditStart(task.id, task.title)}
                  text="Edit"
                  className="px-3 py-1 bg-orange-200 text-orange-900 rounded-md text-xs sm:text-sm"
                />
                <Button
                  onClick={() => deleteTask(task.id)}
                  text="Delete"
                  className="px-3 py-1 bg-red-900 text-orange-100 rounded-md text-xs sm:text-sm"
                />
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
