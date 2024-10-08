import { Metadata } from "next";
import IssueForm from "../_components/IssueForm";

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
