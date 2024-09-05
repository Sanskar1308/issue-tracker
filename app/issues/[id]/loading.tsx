import { SkeletonLoading } from "@/app/components";
import { Box, Card } from "@radix-ui/themes";

const LoadingIssuesDetails = () => {
  return (
    <Box className="max-w-xl">
      <SkeletonLoading height="30" rounded="10" />
      <div className="flex space-x-3 my-2">
        <SkeletonLoading height="25" />
        <SkeletonLoading height="25" />
      </div>
      <Card>
        <SkeletonLoading height="20" />
      </Card>
    </Box>
  );
};

export default LoadingIssuesDetails;
