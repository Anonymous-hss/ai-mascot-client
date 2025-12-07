"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Bot } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.auth.signup({ name, email, password });
      if (res.success) {
        localStorage.setItem("token", res.token);
        router.push("/dashboard");
      } else {
        alert("Signup failed: " + (res.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center space-x-2">
            <Bot className="h-10 w-10 text-blue-600" />
            <span className="font-bold text-2xl text-gray-900">AI Mascot</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Start optimizing your marketing strategy today.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
