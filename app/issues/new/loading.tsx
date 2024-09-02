import { SkeletonLoading } from "@/app/components";
import { Button } from "@radix-ui/themes";

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
