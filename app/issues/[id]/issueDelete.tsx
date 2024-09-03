import { Button } from "@radix-ui/themes";
import React from "react";

const IssueDelete = async ({ issueId }: { issueId: number }) => {
  return <Button color="red">Delete issue</Button>;
};

export default IssueDelete;
