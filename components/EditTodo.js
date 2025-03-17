"use client";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { editTodo } from "@/services/fetchAPI/index";

const EditTodo = ({ todo, updateTask }) => {
  const [editTodoState, setEditTodoState] = useState(false);
  const [task, setTask] = useState(todo.title || "");

  const handleEdit = () => {
    if (todo.isCompleted) return;
    setEditTodoState(!editTodoState);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditTodoState(false);

    try {
      const res = await editTodo(`/api/tasks/${todo.id}`, { title: task });
      if (res.status === "success") {
        updateTask(todo.id, task);
      } else {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Hata:", error.message);
    }
  };

  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} />
      {editTodoState && (
        <Form onSubmit={handleSubmit}>
          <Input type="hidden" name="inputId" value={todo.id} />
          <div className="flex justify-center">
            <Input
              type="text"
              name="newTitle"
              placeholder="Edit Todo..."
              value={task}
              onChange={handleChange}
            />
            <Button type="submit" text="Save" />
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditTodo;
