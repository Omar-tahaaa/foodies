"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

function NavLink({ href, children }) {
  const path = usePathname();
  const isActive = path.startsWith(href);
  return (
    <Link
      href={href}
      className={isActive ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
}

export default NavLink;
