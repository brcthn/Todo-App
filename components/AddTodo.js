"use client";
import { useState } from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import useTaskStore from "@/store/useTaskStore";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const { addTask } = useTaskStore();
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      await addTask({ title: task });
      setTask("");
      setMessage("Task Added!");
    } catch (error) {
      setMessage(`Hata: ${error.message}`);
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex gap-4 items-center w-full max-w-md">
          <Input
            name="input"
            type="text"
            placeholder="Add Todo Here..."
            value={task}
            onChange={handleChange}
            className=" md:w-80 lg:w-100  h-15 p-4 border border-orange-900 rounded-lg bg-orange-900 placeholder-orange-200 text-orange-200"
          />
          <Button
            type="submit"
            text="Add"
            className="h-10 px-6 bg-orange-900  text-orange-200 rounded-md"
          />
        </div>
      </Form>
      {message && (
        <p className="text-slate-600 mt-4 w-full flex justify-center text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default AddTodo;
