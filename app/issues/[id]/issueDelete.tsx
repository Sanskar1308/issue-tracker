"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

const IssueDelete = async ({ issueId }: { issueId: number }) => {
  const [issubmittingDelete, setIssubmittingDelete] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIssubmittingDelete(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIssubmittingDelete(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={issubmittingDelete}>
            <MdOutlineDeleteOutline />
            Delete {issubmittingDelete && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can't be
            undone.
          </AlertDialog.Description>
          <Flex mt="5" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={handleDelete}
                disabled={issubmittingDelete}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue can't be deleted.
          </AlertDialog.Description>
          <Button mt="4" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default IssueDelete;
