
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
  height?: string;
}

export const LoadingSkeleton = ({ count = 1, className = "", height = "h-16" }: LoadingSkeletonProps) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton 
          key={index} 
          className={`${height} w-full ${index < count - 1 ? 'mb-2' : ''} ${className} animate-pulse`} 
        />
      ))}
    </>
  );
};

export const CardSkeleton = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`rounded-lg border p-3 ${isMobile ? 'p-3' : 'p-4'} space-y-2`}>
      <Skeleton className={`${isMobile ? 'h-6 w-3/4' : 'h-8 w-3/4'}`} />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        {!isMobile && <Skeleton className="h-4 w-4/6" />}
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className={`${isMobile ? 'h-7 w-20' : 'h-8 w-24'}`} />
        <Skeleton className={`${isMobile ? 'h-7 w-7' : 'h-8 w-8'} rounded-full`} />
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <Skeleton className={`${isMobile ? 'h-10 w-10' : 'h-12 w-12'} rounded-full`} />
      <div className="space-y-2">
        <Skeleton className={`h-4 ${isMobile ? 'w-[150px]' : 'w-[200px]'}`} />
        {!isMobile && <Skeleton className="h-4 w-[150px]" />}
      </div>
    </div>
  );
};

export const MobileCardSkeleton = () => {
  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex justify-between pt-1">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};

export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-3 p-2">
      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
      <div className="space-y-1 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-8 w-8 rounded-md flex-shrink-0" />
    </div>
  );
};
