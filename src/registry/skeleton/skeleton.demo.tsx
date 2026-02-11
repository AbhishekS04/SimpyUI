"use client"

import Skeleton from './skeleton'

export default function SkeletonDemo() {
  return (
    <div className="w-full max-w-72 space-y-3">
      <Skeleton width="100%" height="12px" />
      <Skeleton width="80%" height="12px" />
      <Skeleton width="60%" height="12px" />
      <div className="flex items-center gap-3 mt-4">
        <Skeleton width="40px" height="40px" rounded="full" />
        <div className="space-y-2 flex-1">
          <Skeleton width="100%" height="10px" />
          <Skeleton width="70%" height="10px" />
        </div>
      </div>
    </div>
  )
}
