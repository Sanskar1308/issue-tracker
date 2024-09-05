import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./issueDetails";
import IssueDelete from "./issueDelete";
import { getServerSession } from "next-auth";
import OAuthOptions from "@/app/api/auth/[...nextauth]/OAuthOption";
import AssigneeSelect from "./AssigneeSelect";
import { Prisma } from "@prisma/client";
import { title } from "process";

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(OAuthOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

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
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  return {
    title: issue?.title,
    description: `Description of issue - ${issue?.description}`,
  };
}

export default IssueDetailsPage;
