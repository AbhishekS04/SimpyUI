"use client";
import React from "react";
import { Compare } from "./compare";

export default function CompareDemo() {
  return (
    <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 px-4 mt-4">
      <div className="flex justify-center items-center">
      <Compare
        firstImage="https://github.com/AbhishekS04/SimpyUI/blob/main/public/code-problem.png?raw=true"
        secondImage="https://github.com/AbhishekS04/SimpyUI/blob/main/public/code-solution.png?raw=true"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
        slideMode="hover"
      />
      </div>
    </div>
  );
}
