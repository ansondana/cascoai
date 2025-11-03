"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user } = useUser();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Test Agent", href: "/test" },
    { name: "Analytics", href: "/analytics" },
    { name: "Knowledge Bank", href: "/knowledge" },
    { name: "Feedback", href: "/feedback" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center">
                <Phone className="h-8 w-8 text-primary" />
                <span className="ml-3 text-xl font-semibold text-gray-900">
                  Casco AI
                </span>
              </Link>
              <nav className="hidden md:flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary border-b-2 border-primary"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden sm:block">
                {user?.name || user?.email}
              </span>
              <a
                href="/api/auth/logout"
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

