import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title } = await req.json();
    if (!title) throw new Error("Görev metni boş olamaz!");

    const newTask = await prisma.task.create({
      data: {
        title,
        completed: false,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      { status: "success", data: newTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function editTodo(formData) {
  const newTitle = formData.get("newTitle");
  const inputId = formData.get("id");

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      title: newTitle,
    },
  });
}
