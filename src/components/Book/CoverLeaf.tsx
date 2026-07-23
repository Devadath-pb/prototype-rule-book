import { forwardRef } from "react";
import { eventMeta } from "../../data/book";

const CoverLeaf = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="page-leaf bg-black">
      <img
        src={eventMeta.coverImage}
        alt={`${eventMeta.title} cover`}
        className="h-full w-full select-none object-contain"
        draggable={false}
      />
    </div>
  );
});

CoverLeaf.displayName = "CoverLeaf";
export default CoverLeaf;
