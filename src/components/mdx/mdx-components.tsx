import { Author } from "./author";
import BlurImage from "@/lib/blur-image";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

// Custom Image component for MDX that uses BlurImage
type MDXImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: ImageProps["src"];
  alt?: string;
  width?: number;
  height?: number;
};

function MDXImage({ src, alt, width, height, ...props }: MDXImageProps) {
  // If it's a relative path or external image, use BlurImage
  if (typeof src === "string") {
    return (
      <div className="relative my-8 overflow-hidden rounded-lg border border-border shadow-sm">
        <BlurImage
          src={src}
          alt={alt || ""}
          width={width || 800}
          height={height || 400}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
          {...props}
        />
      </div>
    );
  }

  // Fallback to regular Image for any edge cases
  return (
    <Image src={src} alt={alt || ""} width={width} height={height} {...props} />
  );
}

// Custom Link component for MDX that handles internal vs external links
type MDXLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href?: string;
  children: ReactNode;
};

function MDXLink({ href, children, ...props }: MDXLinkProps) {
  // Check if it's an internal link
  const isInternal =
    typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));
  const isEmail = typeof href === "string" && href.startsWith("mailto:");

  if (isInternal) {
    // Internal link - use Next.js Link for better performance and SEO
    return (
      <Link
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (isEmail) {
    // Email link
    return (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  }

  // External link - add SEO and security attributes
  return (
    <a
      href={typeof href === "string" ? href : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
      {...props}
    >
      {children}
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

export const mdxComponents = {
  Author,
  Image: MDXImage,
  img: MDXImage, // This handles markdown images ![alt](src)
  Link: MDXLink,
  a: MDXLink, // This handles markdown links [text](url)
};
