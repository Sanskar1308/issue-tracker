import { Table } from "@radix-ui/themes";
import React from "react";
import IssueAction from "./IssueAction";
import SkeletonLoading from "../components/SkeletonLoading";

function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];

  return (
    <div>
      <IssueAction />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <SkeletonLoading height="10" width="full" />
                <div className="block md:hidden mt-2">
                  <SkeletonLoading />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <SkeletonLoading />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <SkeletonLoading />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export default LoadingIssuesPage;
