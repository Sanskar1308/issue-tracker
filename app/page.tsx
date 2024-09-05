import prisma from "@/prisma/client";
import Pagination from "./issues/Pagination";
import IssueSummary from "./IssueSummary";
import LastestIssues from "./LastestIssues";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  return (
    <>
      <LastestIssues />
      <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      <IssueChart open={open} closed={closed} inProgress={inProgress} />
    </>
  );
}
