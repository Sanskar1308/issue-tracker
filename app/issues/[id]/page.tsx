<<<<<<< HEAD
import OAuthOptions from "@/app/api/auth/[...nextauth]/OAuthOption";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import AssigneeSelect from "./AssigneeSelect";
import IssueEditButton from "./IssueEditButton";
import IssueDelete from "./issueDelete";
import IssueDetails from "./issueDetails";
=======
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./issueDetails";
import IssueDelete from "./issueDelete";
import { getServerSession } from "next-auth";
import OAuthOptions from "@/app/api/auth/[...nextauth]/OAuthOption";
import AssigneeSelect from "./AssigneeSelect";
>>>>>>> origin/master

interface Props {
  params: { id: string };
}

<<<<<<< HEAD
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(OAuthOptions);
  const issue = await fetchUser(parseInt(params.id));
=======
async function IssueDetailsPage({ params }: Props) {
  const session = await getServerSession(OAuthOptions);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
>>>>>>> origin/master

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

<<<<<<< HEAD
export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Description of issue - ${issue?.description}`,
  };
}

=======
>>>>>>> origin/master
export default IssueDetailsPage;
