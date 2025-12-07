"use client";
import Link from "next/link";
import { ArrowRight, BarChart3, Calendar, Megaphone, FileText } from "lucide-react";

export default function Dashboard() {
  const cards = [
    {
      title: "Brand Audit",
      description: "Analyze your brand voice and positioning.",
      href: "/dashboard/brand-audit",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Marketing Strategy",
      description: "Generate a comprehensive strategy.",
      href: "/dashboard/strategy",
      icon: BarChart3,
      color: "bg-green-500",
    },
    {
      title: "Content Calendar",
      description: "Plan your social media content.",
      href: "/dashboard/content-calendar",
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      title: "Campaigns",
      description: "Design new marketing campaigns.",
      href: "/dashboard/campaigns",
      icon: Megaphone,
      color: "bg-orange-500",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome back!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group bg-white overflow-hidden rounded-xl shadow-sm border hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className={`h-12 w-12 rounded-lg ${card.color} bg-opacity-10 flex items-center justify-center mb-4`}>
                <card.icon className={`h-6 w-6 ${card.color.replace("bg-", "text-")}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{card.description}</p>
              <div className="flex items-center text-sm font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                Get Started <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Recent Activity Placeholder */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white shadow-sm rounded-xl border p-8 text-center text-gray-500">
          No recent activity found. Start by running a brand audit!
        </div>
      </div>
    </div>
  );
}
