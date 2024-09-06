import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import OAuthOptions from "../../auth/[...nextauth]/OAuthOption";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } } // id should be a string
) {
  // const session = await getServerSession(OAuthOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { assignedToUserId, title, description, status } = body;

  // Validate assignedToUserId if provided
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId }, // id is an ObjectId as a string
    });
    if (!user) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }
  }

  // Find the issue by ID (which is a string)
  const issue = await prisma.issue.findUnique({
    where: { id: params.id }, // Prisma expects a string for ObjectId
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id }, // Use the existing string ObjectId
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

// DELETE handler for deleting an issue
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } } // id should be a string
) {
  const session = await getServerSession(OAuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Find the issue by ID (which is a string)
  const issue = await prisma.issue.findUnique({
    where: { id: params.id }, // Prisma expects a string for ObjectId
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Delete the issue
  const deletedIssue = await prisma.issue.delete({
    where: { id: issue.id }, // id is a string (ObjectId)
  });

  return NextResponse.json({
    message: `Successfully deleted issue with id - ${deletedIssue.id}`,
  });
}
