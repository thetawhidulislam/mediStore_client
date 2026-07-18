"use client";

import { Menu, ShoppingCart } from "lucide-react"; // Imported ShoppingCart
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  user?: { name: string; image?: string | null; role?: string };
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  userInfo?: {
    name: string;
    image?: string | null;
    role?: string;
  };
}

const Navbar1 = ({
  userInfo,
  logo = {
    url: "/",
    src: "https://i.ibb.co/sdDnmQTJ/4022533.png",
    alt: "MediStore Logo",
    title: "MediStore",
  },

  menu = [
    { title: "Home", url: "/" },
    { title: "Shop", url: "/shop" },
    { title: "About", url: "/about" },
    { title: "How It Works", url: "/how-it-works" },

   
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
 
  const dashboardUrl =
    userInfo?.role === "ADMIN"
      ? "/admin-dashboard"
      : userInfo?.role === "SELLER"
        ? "/seller-dashboard"
        : "/customer-dashboard";

  
  const finalMenu = userInfo?.name
    ? [...menu, { title: "Dashboard", url: dashboardUrl }]
    : menu;

  return (
    <section
      className={cn(
        "sticky top-0 z-50 w-full py-4 bg-card shadow-sm",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo + Menu */}
          <div className="flex items-center gap-10">
            <Link href={logo.url} className="flex items-center gap-2">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={36}
                height={36}
                className="object-contain"
              />

              <span className="text-xl font-bold text-foreground tracking-tight">
                {logo.title}
              </span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="flex gap-4">
                {finalMenu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth / User */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop Cart Icon */}
            <Link
              href="/cart"
              className="p-2 text-foreground hover:text-primary dark:hover:text-primary transition"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {userInfo?.name ? (
              <div className="relative group">
                <Image
                  src={userInfo.image || "/default-avatar.png"}
                  alt={userInfo.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border border-border cursor-pointer object-cover"
                />

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-20">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-foreground hover:bg-muted transition"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={async () => {
                      try {
                        await authClient.signOut();
                        window.location.href = "/";
                      } catch (error) {
                        console.error("Logout failed:", error);
                      }
                    }}
                    className="block px-4 py-2 hover:bg-muted transition text-sm text-destructive hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant="outline" className="px-4 py-2 text-sm">
                  <Link href={auth?.login?.url}>{auth?.login?.title}</Link>
                </Button>
                <Button asChild className="px-4 py-2 text-sm">
                  <Link href={auth?.signup?.url}>{auth?.signup?.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        <div className="flex lg:hidden items-center justify-between">
          <Link href={logo.url} className="flex items-center gap-2">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={36}
              height={36}
              className="object-contain"
            />
          </Link>

          {/* Right side: Profile + Hamburger */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Cart Icon */}
            <Link
              href="/cart"
              className="p-2 text-foreground hover:text-primary transition"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {userInfo?.name && (
              <Image
                src={userInfo.image || "/default-avatar.png"}
                alt={userInfo.name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border border-border object-cover"
              />
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent className="w-full max-w-xs p-4">
                <SheetHeader>
                  <SheetTitle className="flex items-center justify-between">
                    <Link href={logo.url} className="flex items-center gap-2">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </Link>

                    {userInfo?.name && (
                      <div className="flex flex-col items-end">
                        <span className="text-foreground font-medium">
                          {userInfo.name}
                        </span>
                        <Link
                          href={dashboardUrl}
                          className="text-sm text-primary hover:underline"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={async () => {
                            try {
                              await authClient.signOut();
                              window.location.href = "/";
                            } catch (error) {
                              console.error("Logout failed:", error);
                            }
                          }}
                          className="text-sm text-destructive hover:underline"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 mt-4">
                  {/* Menu Links */}
                  <Accordion
                    type="single"
                    collapsible
                    className="flex flex-col gap-2"
                  >
                    {finalMenu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  {/* Auth Buttons if not logged in */}
                  {!userInfo?.name && (
                    <div className="flex flex-col gap-2 mt-4">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="text-foreground dark:text-white data-[state=open]:text-foreground dark:data-[state=open]:text-white">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-card p-4 rounded-md shadow-md">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-2 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-1">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold py-2 block text-foreground hover:text-primary transition dark:text-white dark:hover:text-primary"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Link
      className="flex flex-row gap-3 items-start rounded-md p-3 hover:bg-muted transition"
      href={item.url}
    >
      {item.icon && <div className="text-muted-foreground">{item.icon}</div>}
      <div>
        <div className="text-sm font-semibold text-foreground">{item.title}</div>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };
