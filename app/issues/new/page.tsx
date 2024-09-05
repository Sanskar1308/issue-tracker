import React from "react";
import IssueForm from "../_components/IssueForm";
import { Metadata } from "next";

const NewIssuepage = () => {
  return (
    <div>
      <IssueForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Issue tracker- Add issue",
  description: "Add New Issue",
};

export default NewIssuepage;
