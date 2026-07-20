// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// // GET users
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
// }

// // POST user
// export async function POST(req) {
//   try {
//     const body = await req.json();

//     console.log("BODY RECEIVED:", body);

//     const user = await prisma.user.create({
//       data: body,
//     });

//     console.log("USER CREATED:", user);

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("POST ERROR:", error);

//     return NextResponse.json(
//       {
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET USERS
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

// CREATE USER
export async function POST(req) {
  try {
    const body = await req.json();

    console.log("BODY RECEIVED:", body);

    // Validation
    if (
      !body.name ||
      !body.email ||
      !body.primarySkill
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Normalize email
    const email = body.email.trim().toLowerCase();

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already registered",
        },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: body.name.trim(),
        email,
        primarySkill: body.primarySkill,
        lookingForSkills: body.lookingForSkills || [],
      },
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