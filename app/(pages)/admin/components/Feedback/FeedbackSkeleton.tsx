import { Skeleton } from "@/components/ui/skeleton"

export default function FeedbackSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[150px]" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        ))}
      </div>
    </div>
  )
}