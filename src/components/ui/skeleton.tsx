import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-8 w-64 bg-gray-200/80 dark:bg-gray-700/80" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full max-w-md bg-gray-200/60 dark:bg-gray-700/60" />
        <Skeleton className="h-4 w-full max-w-sm bg-gray-200/60 dark:bg-gray-700/60" />
      </div>
    </div>
  );
} 