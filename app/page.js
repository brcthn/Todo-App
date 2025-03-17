"use client";
import { useState, useEffect } from "react";
import AddTodo from "@/components/AddTodo";
import TaskList from "@/components/TaskList";
import useTaskStore from "@/store/useTaskStore";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { tasks, fetchTasks, totalTasks, completedTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().then(() => setLoading(false));
  }, []);

  return (
    <div className="h-screen w-full bg-todo bg-cover bg-center bg-no-repeat">
      <h1 className="text-3xl  p-5 font-bold text-center mb-4 text-orange-950">
        TODO
      </h1>
      {loading ? (
        <p className="text-center text-orange-700 font-semibold animate-pulse">
          Loading tasks...
        </p>
      ) : (
        <>
          <AddTodo />
          <TaskList allData={tasks} />
        </>
      )}

      <div className="text-center mt-4 flex flex-col items-center">
        {totalTasks() > 0 && (
          <div className="flex items-center gap-2">
            <CheckCircleIcon
              className={`h-8 w-8 ${
                completedTasks() === totalTasks()
                  ? "text-lime-900"
                  : "text-orange-700"
              }`}
            />
            <span className="text-orange-900 font-semibold">
              {completedTasks()}/{totalTasks()} Task Completed!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
