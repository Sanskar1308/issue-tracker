import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IssueSchema } from "../../validationSchema";
import OAuthOptions from "../auth/[...nextauth]/OAuthOption";

export async function POST(request: NextRequest) {
  const session = await getServerSession(OAuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = IssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  const response = NextResponse.json(newIssue, { status: 201 });

  response.headers.set("Cache-Control", "no-store");

  return response;
}
