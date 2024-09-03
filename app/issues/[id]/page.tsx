import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import IssueEditButton from "./IssueEditButton";
import IssueDetails from "./issueDetails";
import IssueDelete from "./issueDelete";

interface Props {
  params: { id: string };
}

async function IssueDetailsPage({ params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className="lg:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <IssueEditButton issueId={issue.id} />
          <IssueDelete issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}

export default IssueDetailsPage;
