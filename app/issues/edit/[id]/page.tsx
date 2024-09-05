import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: "Issue tracker- Edit Issue",
    description: `Edit ${issue?.title} issue`,
  };
}

export default EditIssuePage;
