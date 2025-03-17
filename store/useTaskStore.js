import { create } from "zustand";
import { getAPI, putAPI, deleteAPI, postAPI } from "@/services/fetchAPI";

const useTaskStore = create((set, get) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const data = await getAPI("/api/tasks");
      set({ tasks: data });
    } catch (error) {
      console.error("API request error:", error);
    }
  },

  addTask: async (taskData) => {
    try {
      const res = await postAPI("/api/tasks", taskData);
      if (res.status === "success") {
        set((state) => ({ tasks: [...state.tasks, res.data] }));
      }
    } catch (error) {
      console.error("Task addition error:", error);
    }
  },

  editTask: async (id, title) => {
    try {
      await putAPI(`/api/tasks/${id}`, { title });
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, title } : task
        ),
      }));
    } catch (error) {
      console.error("Update error:", error);
    }
  },

  toggleTaskCompleted: async (id, completed) => {
    try {
      await putAPI(`/api/tasks/${id}`, { completed });
      await get().fetchTasks();
    } catch (error) {
      console.error("Completion error:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await deleteAPI(`/api/tasks/${id}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Deleted error:", error);
    }
  },
  totalTasks: () => get().tasks.length,
  completedTasks: () => get().tasks.filter((task) => task.completed).length,
  pendingTasks: () => get().tasks.filter((task) => !task.completed).length,
}));

export default useTaskStore;
