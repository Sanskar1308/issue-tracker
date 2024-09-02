import prisma from "@/prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import IssueStatusBadge from "@/app/components/issueStatusBadge";

interface Props {
  params: { id: string };
}

async function IssueDetails({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card>{issue.description}</Card>
    </div>
  );
}

export default IssueDetails;
