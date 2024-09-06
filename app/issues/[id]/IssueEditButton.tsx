import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const IssueEditButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button>
      <FaRegEdit />
      <Link href={`/issues/edit/${issueId}`}>Edit</Link>
    </Button>
  );
};

export default IssueEditButton;
