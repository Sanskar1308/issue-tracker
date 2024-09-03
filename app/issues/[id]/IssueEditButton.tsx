import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const IssueEditButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <FaRegEdit />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
};

export default IssueEditButton;
