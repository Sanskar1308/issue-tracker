function SkeletonLoading({
  width = "full",
  height = "10",
  rounded = "full",
}: {
  width?: string;
  height?: string;
  rounded?: string;
}) {
  return (
    <div
      style={{
        width: width === "full" ? "100%" : `${width}px`,
        height: `${height}px`,
        borderRadius: rounded === "full" ? "9999px" : `${rounded}px`,
      }}
      className="bg-zinc-200"
    ></div>
  );
}

export default SkeletonLoading;
