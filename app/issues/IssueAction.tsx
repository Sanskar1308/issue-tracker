import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import FilterByStatus from "./FilterByStatus";

function IssueAction() {
  return (
    <Flex justify="between">
      <FilterByStatus />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueAction;
