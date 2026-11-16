"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Logo from "./logo";
import CartButton from "./cart-button";
import WishlistButton from "./wishlist-button";
import LanguageButton from "./language-button";

import { useTranslation } from "../lib/use-translation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.collection, href: "/collection" },
    {
      label: t.nav.philosophy,
      href: "/#philosophy",
    },
  ];

  return (
    <header className="site-header">
      <div className="announcement">
        {t.nav.announcement}
      </div>

      <nav
        className="navbar"
        aria-label={t.nav.home}
      >
        <button
          type="button"
          className="mobile-menu-button"
          aria-label={
            menuOpen ? t.nav.closeMenu : t.nav.openMenu
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <Logo />

        <div className="nav-actions">
          <LanguageButton />
          <WishlistButton />
          <CartButton />
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}