"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, LayoutDashboard, FileText, Calendar, Megaphone, Settings, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Brand Audit", href: "/dashboard/brand-audit", icon: FileText },
    { name: "Strategy", href: "/dashboard/strategy", icon: Megaphone },
    { name: "Content Calendar", href: "/dashboard/content-calendar", icon: Calendar },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-auto`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">AI Mascot</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-blue-700" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-700" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500">
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-semibold text-gray-900">Dashboard</span>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
