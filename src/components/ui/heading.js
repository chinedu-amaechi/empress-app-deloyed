// src/components/ui/heading.js
import { activeFont } from "@/components/ui/fonts";

const headingSizes = {
  1: "text-2xl md:text-4xl font-bold",
  2: "text-lg md:text-xl font-semibold",
  3: "text-base md:text-lg font-semibold",
  4: "text-sm md:text-base font-semibold",
  5: "text-xs md:text-sm font-semibold",
  6: "text-xs md:text-sm font-semibold",
};

function Heading({ level = 1, children, className = "" }) {
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      className={`${headingSizes[level] || headingSizes[6]} ${
        activeFont.className
      } ${className}`}
    >
      {children}
    </HeadingTag>
  );
}

export default Heading;
