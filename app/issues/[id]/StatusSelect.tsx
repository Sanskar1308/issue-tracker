"use client";

import { useState } from "react";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Spinner } from "@/app/components";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue, Status } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  issue: Issue;
}

export default function StatusSelect({ issue }: Props) {
  const router = useRouter();
  const [current, setCurrent] = useState<Status>(issue.status);
  const [saving, setSaving] = useState(false);

  const labels: Record<Status, string> = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    CLOSED: "Closed",
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={saving}>
        <Button variant="soft" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {saving ? <Spinner /> : labels[current]}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        {Object.entries(labels).map(([key, label]) => {
          const statusKey = key as Status;
          return (
            <DropdownMenu.Item
              key={statusKey}
              disabled={statusKey === current}
              onSelect={async () => {
                setSaving(true);
                try {
                  await axios.patch(`/api/issues/${issue.id}`, { status: statusKey });
                  setCurrent(statusKey);
                  toast.success("Status updated");
                  router.refresh();
                } catch {
                  toast.error("Failed to update status");
                } finally {
                  setSaving(false);
                }
              }}
            >
              {label}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
