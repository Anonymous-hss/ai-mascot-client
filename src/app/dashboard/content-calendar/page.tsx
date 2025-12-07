"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AIProgress } from "@/components/ui/ai-progress";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import Link from "next/link";

export default function ContentCalendarPage() {
  const [step, setStep] = useState<"intro" | "loading" | "result">("intro");
  const [result, setResult] = useState<any>(null);
  const [month, setMonth] = useState("Next Month");

  const handleGenerate = async () => {
    setStep("loading");
    try {
      const token = localStorage.getItem("token") || "";
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;

      const res = await api.ai.contentCalendar({ userId, month }, token);
      
      if (res.success) {
        setResult(res.data);
        setStep("result");
      } else {
        alert("Error: " + res.error);
        setStep("intro");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate calendar");
      setStep("intro");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Calendar</h1>
      <p className="text-gray-500 mb-8">Plan your content strategy with AI-generated topics and schedules.</p>

      {step === "intro" && (
        <FadeIn>
          <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan your content</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              Based on your strategy, we'll generate a content calendar with post ideas, formats, and captions.
            </p>
            <Button size="lg" onClick={handleGenerate}>
              Generate Calendar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </FadeIn>
      )}

      {step === "loading" && (
        <AIProgress 
            steps={[
                "Reviewing Strategy...",
                "Brainstorming Topics...",
                "Drafting Captions...",
                "Scheduling Posts...",
                "Finalizing Calendar..."
            ]} 
        />
      )}

      {step === "result" && result && (
        <FadeIn>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(result.posts || []).map((post: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">{post.date || `Day ${i+1}`}</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">{post.platform}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{post.topic}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.caption}</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <FileText className="h-3 w-3 mr-1" /> {post.format}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Link href="/dashboard/campaign">
                <Button size="lg">
                  Plan a Campaign <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
