"use client";

import { ErrorMessage, Spinner } from "@/app/components";
import { IssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, DropdownMenu, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import IssueDelete from "../[id]/issueDelete";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const [error, setError] = useState("");
  const [issubmitting, setIssubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIssubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIssubmitting(false);
      setError("Unexpected error occurred!!!");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3 mb-2" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        {issue && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="soft">
                    {"Select Status"}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item onSelect={() => field.onChange("OPEN")}>
                    Open
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => field.onChange("IN_PROGRESS")}
                  >
                    In Progress
                  </DropdownMenu.Item>
                  <DropdownMenu.Item onSelect={() => field.onChange("CLOSED")}>
                    Closed
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          />
        )}

        <Button disabled={issubmitting}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {issubmitting && <Spinner />}
        </Button>
      </form>
      {issue && <IssueDelete issueId={issue.id} />}
    </div>
  );
}

export default IssueForm;
