import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LastestIssues from "./LastestIssues";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

// Helper function to get date ranges
function getDateRange(period: string) {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  switch (period) {
    case 'today':
      return { gte: startOfToday };
    case 'week':
      return { gte: startOfWeek };
    case 'month':
      return { gte: startOfMonth };
    default:
      return {}; // All time
  }
}

// Function to get counts for a specific time period
async function getIssueCounts(period: string = 'all') {
  const dateFilter = getDateRange(period);
  
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ 
      where: { 
        status: "OPEN",
        createdAt: dateFilter
      } 
    }),
    prisma.issue.count({
      where: { 
        status: "IN_PROGRESS",
        createdAt: dateFilter
      },
    }),
    prisma.issue.count({ 
      where: { 
        status: "CLOSED",
        createdAt: dateFilter
      } 
    })
  ]);

  return { open, inProgress, closed };
}

export default async function Home({ 
  searchParams 
}: { 
  searchParams: { period?: string } 
}) {
  const period = searchParams.period || 'all';
  const { open, inProgress, closed } = await getIssueCounts(period);
  
  // Also get all-time counts for the summary
  const allTimeCounts = period !== 'all' ? await getIssueCounts('all') : { open, inProgress, closed };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary 
          open={allTimeCounts.open} 
          closed={allTimeCounts.closed} 
          inProgress={allTimeCounts.inProgress} 
        />
        <IssueChart 
          open={open} 
          closed={closed} 
          inProgress={inProgress}
          currentPeriod={period}
        />
      </Flex>
      <LastestIssues type="createdAt" />
      <LastestIssues type="updatedAt" />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue tracker- Dashboard",
  description: "View a summary of project issues",
};
