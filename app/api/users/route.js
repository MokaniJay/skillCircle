import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST user
export async function POST(req) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    const user = await prisma.user.create({
      data: body,
    });

    console.log("USER CREATED:", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}