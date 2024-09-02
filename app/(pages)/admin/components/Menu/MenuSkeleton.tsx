import { Skeleton } from "@/components/ui/skeleton"

export default function MenuSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-10 w-[250px]" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  )
}