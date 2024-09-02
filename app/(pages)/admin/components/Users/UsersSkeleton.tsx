import { Skeleton } from "@/components/ui/skeleton"

export default function UsersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}