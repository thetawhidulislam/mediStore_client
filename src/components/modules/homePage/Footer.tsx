"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Cross,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Here you can call your newsletter API
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#0B1120] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500">
                <Cross className="h-4 w-4 text-white" />
              </span>
              <span className="text-lg font-bold text-white">MediStore</span>
            </Link>
            <p className="text-sm text-slate-400">
              MediStore connects you with verified pharmacies to ensure
              authentic medicines, fast delivery, and safe healthcare.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com/medistore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MediStore on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-teal-500 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/medistore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MediStore on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-teal-500 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/medistore"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MediStore on Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-teal-500 hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/medicine?category=1"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Medicines
                </Link>
              </li>
              <li>
                <Link
                  href="/medicine?category=2"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Medical Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/medicine?category=3"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Health Care
                </Link>
              </li>
              <li>
                <Link
                  href="/medicine?category=4"
                  className="text-sm text-slate-400 transition-colors hover:text-teal-400"
                >
                  Baby Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-5">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Contact Us
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:support@medistore.com"
                    className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-400"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    support@medistore.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+18005551234"
                    className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-teal-400"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    +1 (800) 555-1234
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  221B Health Ave, Suite 400, New York, NY 10001
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                Newsletter
              </h4>
              <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
                />
                <Button
                  type="submit"
                  className="w-full bg-teal-500 text-white hover:bg-teal-600"
                >
                  {submitted ? "Subscribed!" : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} MediStore. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-teal-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-teal-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
