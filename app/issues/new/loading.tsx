import ErrorMessage from "@/app/components/ErrorMessage";
import SkeletonLoading from "@/app/components/SkeletonLoading";
import { Callout, TextField, Button, Spinner } from "@radix-ui/themes";
import { register } from "module";
import React from "react";
import { Controller } from "react-hook-form";

const LoadingNewIssue = () => {
  return (
    <div className="max-w-xl">
      <form className="space-y-3">
        <SkeletonLoading height="20"></SkeletonLoading>
        <SkeletonLoading height="400" rounded="5"></SkeletonLoading>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default LoadingNewIssue;
