import { forwardRef } from "react";

const BackCoverLeaf = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="page-leaf bg-leather">
      <div className="absolute inset-0 bg-leather-grain opacity-70" />
      <div className="absolute inset-4 rounded-[4px] border border-gold/25" />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center sm:px-8">
        <span className="font-display text-[0.72rem] uppercase tracking-[0.4em] text-gold/50">
          Department of Computer Science
        </span>
        <span className="h-px w-10 bg-gold/30" />
        <span className="font-body text-[0.72rem] uppercase tracking-[0.3em] text-fog/70">
          Nirmala College of Arts and Science
        </span>
      </div>
    </div>
  );
});

BackCoverLeaf.displayName = "BackCoverLeaf";
export default BackCoverLeaf;
