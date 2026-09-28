import { cn } from "@/lib/utils";

/* ---------- Border1 ---------- */
export const Border1 = () => (
  <div className="relative w-full h-full">
    <span className="absolute -top-0 -left-[0.5px] block size-6 border-dashed border-t-1 border-l-1 border-muted-foreground z-30" />
    <span className="absolute -top-px -right-px block size-6 border-dashed border-t-1 border-r-1 border-muted-foreground z-30" />
    <span className="absolute -bottom-px -left-[0.5px] block size-6 border-dashed border-b-1 border-l-1 border-muted-foreground z-30" />
    <span className="absolute -bottom-px -right-px block size-6 border-b-1 border-r-1 border-dashed border-muted-foreground z-30" />
  </div>
);

/* ---------- Border2 ---------- */
export const Border2 = () => (
  <div className="relative w-full h-full">
    <span className="absolute -top-0 -left-[0.5px] block size-6 border-t-1 border-l-1 border-muted-foreground z-30" />
    <span className="absolute -top-px -right-px block size-6 border-t-1 border-r-1 border-muted-foreground z-30" />
    <span className="absolute -bottom-px -left-[0.5px] block size-6 border-b-1 border-l-1 border-muted-foreground z-30" />
    <span className="absolute -bottom-px -right-px block size-6 border-b-1 border-r-1 border-muted-foreground z-30" />
  </div>
);

/* ---------- Intersection1 ---------- */
export const Intersection1 = () => (
  <div className="relative w-full h-full">
    <div className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 border border-dashed border-gray-300 dark:border-gray-700 rounded-full z-10 pointer-events-none" />
    <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent z-10 pointer-events-none" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent z-10 pointer-events-none" />
  </div>
);

/* ---------- Intersection2 ---------- */
export const Intersection2 = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-full grid grid-cols-[1fr_1rem_auto_1rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] [--pattern-fg:var(--color-gray-950)]/5 dark:bg-transparent dark:[--pattern-fg:var(--color-white)]/10">
    <div className="col-start-3 row-start-3 flex max-w-lg flex-col relative">
      {children}
    </div>
    <div className="-right-px col-start-2 row-span-full row-start-1 border-x mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
    <div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) mask-y-from-60% bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed" />
    <div className="relative -bottom-px col-span-full col-start-1 row-start-2 mask-x-from-60% border-t border-dashed" />
    <div className="relative -top-px col-span-full col-start-1 row-start-4 mask-x-from-60% border-b border-dashed" />
  </div>
);

/* ---------- Star ---------- */
const Star = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-4 h-4 text-muted", className)}>
      <svg viewBox="0 0 30 30" className="w-full h-full">
        <path
          fill="currentColor"
          d="
          M15 0
          C19 9 21 11 30 15
          C21 19 19 21 15 30
          C11 21 9 19 0 15
          C9 11 11 9 15 0
          Z
          "
        />
      </svg>
    </div>
  );
};

/* ---------- StarBorders ---------- */
export const StarBorders = () => {
  return (
    <div className="relative h-full w-full flex justify-center items-center border-dashed border overflow-hidden">
      <Star className="absolute -top-[7.9px] -right-[7.6px] z-50" />
      <Star className="absolute -bottom-[8px] -right-[7.8px] z-50" />
      <Star className="absolute -top-[7.9px] -left-[7.8px] z-50" />
      <Star className="absolute -bottom-[8px] -left-[7.8px] z-50" />
    </div>
  );
};
