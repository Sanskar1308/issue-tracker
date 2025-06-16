// app/(…)/issues/page.tsx
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import IssueAction from "./IssueAction";
import { Issue, Status, Prisma } from "@prisma/client";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa";
import Pagination from "./Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

async function issues({ searchParams }: Props) {
  // ————— Filter by status —————
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? (searchParams.status as Status)
    : undefined;

  // ————— Determine sort column —————
  const rawOrder = searchParams.orderBy;
  type Column = typeof columnNames[number];

  const orderByColumn: Column =
    typeof rawOrder === "string" && columnNames.includes(rawOrder as Column)
      ? (rawOrder as Column)
      : "createdAt";

  // ————— Build Prisma‐typed orderBy —————
  const orderBy: Prisma.IssueOrderByWithRelationInput = {
    [orderByColumn]: "desc",
  };

  // ————— Pagination —————
  const page = parseInt(searchParams.page, 10) || 1;
  const pageSize = 10;

  // ————— Fetch data —————
  const issues = await prisma.issue.findMany({
    where:   { status },
    orderBy,   // ← always valid, defaults to createdAt desc
    skip:    (page - 1) * pageSize,
    take:    pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  // ————— Render —————
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
  title: "Issue tracker – Issues Details",
  description: "View all project issues",
};

export const dynamic = "force-dynamic";
export default issues;
