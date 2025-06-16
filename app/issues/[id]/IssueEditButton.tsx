import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

const IssueEditButton = ({ issueId }: { issueId: string }) => (
  <Button asChild>
    <Link href={`/issues/edit/${issueId}`}>
      <FaRegEdit />
      Edit
    </Link>
  </Button>
);

export default IssueEditButton;