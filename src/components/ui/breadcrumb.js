"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items = [], currentCollection = null }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Generate collection name with proper formatting
  const formatCollectionName = (name) => {
    if (!name) return "";

    // Handle kebab-case to Title Case conversion
    if (name.includes("-")) {
      return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    // Handle camelCase to Title Case conversion
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // If specific items are not provided, generate based on current path
  const breadcrumbItems =
    items.length > 0
      ? items
      : [
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
        ];

  // Add current collection if available
  if (
    currentCollection &&
    !items.some(
      (item) => item.label === formatCollectionName(currentCollection)
    )
  ) {
    breadcrumbItems.push({
      label: formatCollectionName(currentCollection),
      href: `/collections?collection=${currentCollection}`,
      active: true,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 sm:px-6 lg:px-0">
      <ol className="flex flex-wrap items-center text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400 flex-shrink-0" />
            )}

            {item.active ? (
              <span className="text-[#11296B] font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 hover:text-[#11296B] transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
