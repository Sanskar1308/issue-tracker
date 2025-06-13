import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

interface Props {
  type: "createdAt" | "updatedAt";
}

const LastestIssues = async ({ type }: Props) => {
  const issues = await prisma.issue.findMany({
    orderBy: { [type]: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const getTitle = (type: string) => {
    return type === "createdAt" ? "Latest Issues" : "Recently Updated Issues";
  };

  return (
    <Card>
      <Heading size="4" mb="5">
        {getTitle(type)}
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LastestIssues;