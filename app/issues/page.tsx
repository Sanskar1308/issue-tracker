import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueAction from "./IssueAction";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import Pagination from "./Pagination";

interface Props {
  searchParams: IssueQuery;
}

async function issues({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });
  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      {Math.ceil(issueCount / pageSize) > 1 && (
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      )}
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker- Issues Details",
  description: "View all project issues",
};

export const dynamic = "force-dynamic";
export default issues;
