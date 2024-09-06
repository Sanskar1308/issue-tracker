import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./issueDetails";
import IssueDelete from "./issueDelete";
import { getServerSession } from "next-auth";
import OAuthOptions from "@/app/api/auth/[...nextauth]/OAuthOption";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import issues from "../page";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(OAuthOptions);
  const issue = await prisma.issue.findUnique({ where: { id: params.id } });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <IssueEditButton issueId={issue.id} />
            <IssueDelete issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(params.id);

  return {
    title: issue?.title,
    description: `Description of issue - ${issue?.description}`,
  };
}

export default IssueDetailsPage;
