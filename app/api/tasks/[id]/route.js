import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, context) {
  const params = await context.params;
  const { id } = params;
  const { title, completed } = await req.json();

  try {
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Task didn't find!" }, { status: 404 });
  }
}

export async function DELETE(req, context) {
  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Missing parameters!" }, { status: 400 });
  }

  try {
    await prisma.task.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Task deleted." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Deletion failed!" }, { status: 500 });
  }
}
