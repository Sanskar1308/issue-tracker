"use client";

import { useState } from "react";
import { SkeletonLoading, Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [selected, setSelected] = useState<string>(
    issue.assignedToUserId ?? "none"
  );

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <SkeletonLoading height="35" rounded="5" />;
  if (error) return null;

  // find the display name for the currently selected user
  const selectedUser = users?.find((u) => u.id === selected);

  return (
    <>
      <Select.Root
        value={selected}
        onValueChange={async (userId) => {
          setIsSaving(true);
          try {
            await axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === "none" ? null : userId,
            });
            setSelected(userId);
            toast.success("Assignment saved");
          } catch {
            toast.error("Unable to save the changes.");
          } finally {
            setIsSaving(false);
          }
        }}
      >
        <Select.Trigger
          disabled={isSaving}
          aria-label="Assign issue"
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          {isSaving ? (
            <SkeletonLoading />
          ) : (
            <span>
              {selected === "none"
                ? "Unassigned"
                : selectedUser?.name ?? "Unknown"}
            </span>
          )}
        </Select.Trigger>

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="none">Unassigned</Select.Item>
            {users!.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
