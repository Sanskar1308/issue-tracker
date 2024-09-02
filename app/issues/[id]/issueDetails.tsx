import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Card, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
