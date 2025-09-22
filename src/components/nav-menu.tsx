"use client";

import { useMarketingContent } from "@/lib/marketing-translations";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface NavItem {
  name: string;
  href: string;
}

export function NavMenu() {
  const ref = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isManualScroll, setIsManualScroll] = useState(false);
  const { nav } = useMarketingContent();
  const navs: NavItem[] = nav.links;

  React.useEffect(() => {
    // Initialize with first nav item
    const firstAnchor = navs.find((item) => item.href.startsWith("#"));
    if (!firstAnchor) {
      return;
    }
    const firstItem = ref.current?.querySelector(
      `[href="${firstAnchor.href}"]`,
    )?.parentElement;
    if (firstItem) {
      const rect = firstItem.getBoundingClientRect();
      setLeft(firstItem.offsetLeft);
      setWidth(rect.width);
      setIsReady(true);
    }
  }, [navs]);

  React.useEffect(() => {
    const handleScroll = () => {
      // Skip scroll handling during manual click scrolling
      if (isManualScroll) return;

      const sections = navs
        .filter((item) => item.href.startsWith("#"))
        .map((item) => item.href.substring(1));

      // Find the section closest to viewport top
      let closestSection = sections[0];
      let minDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100); // Offset by 100px to trigger earlier
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        }
      }

      // Update active section and nav indicator
      setActiveSection(closestSection);
      const navItem = ref.current?.querySelector(
        `[href="#${closestSection}"]`,
      )?.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isManualScroll, navs]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    // If it's an external link (starts with "/"), don't prevent default
    if (item.href.startsWith("/")) {
      return; // Let the browser handle the navigation
    }

    e.preventDefault();

    const targetId = item.href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      // Set manual scroll flag
      setIsManualScroll(true);

      // Immediately update nav state
      setActiveSection(targetId);
      const navItem = e.currentTarget.parentElement;
      if (navItem) {
        const rect = navItem.getBoundingClientRect();
        setLeft(navItem.offsetLeft);
        setWidth(rect.width);
      }

      // Calculate exact scroll position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset

      // Smooth scroll to exact position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Reset manual scroll flag after animation completes
      setTimeout(() => {
        setIsManualScroll(false);
      }, 500); // Adjust timing to match scroll animation duration
    }
  };

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center"
        ref={ref}
      >
        {navs.map((item) => (
          <li
            key={item.name}
            className={`z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              activeSection === item.href.substring(1) && !item.href.startsWith("/")
                ? "text-primary"
                : "text-primary/60 hover:text-primary"
            } tracking-tight`}
          >
            {item.href.startsWith("/") ? (
              <Link href={item.href} className="hover:text-primary">
                {item.name}
              </Link>
            ) : (
              <a href={item.href} onClick={(e) => handleClick(e, item)}>
                {item.name}
              </a>
            )}
          </li>
        ))}
        {isReady && (
          <motion.li
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-0 my-1.5 rounded-full bg-accent/60 border border-border"
          />
        )}
      </ul>
    </div>
  );
}
