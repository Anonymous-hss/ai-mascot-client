"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Bot, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">AI Mascot</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/#features" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Features</Link>
            <Link href="/#pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="/login" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Login</Link>
            <Link href="/signup" className="block px-3 py-2 text-blue-600 font-medium">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
