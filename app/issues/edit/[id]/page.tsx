<<<<<<< HEAD
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueForm from "../../_components/IssueForm";
=======
import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
>>>>>>> origin/master

interface Props {
  params: { id: string };
}

<<<<<<< HEAD
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));
=======
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
>>>>>>> origin/master

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

<<<<<<< HEAD
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: "Issue tracker- Edit Issue",
    description: `Edit ${issue?.title} issue`,
  };
}

=======
>>>>>>> origin/master
export default EditIssuePage;
