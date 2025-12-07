"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { AIProgress } from "@/components/ui/ai-progress";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Target, TrendingUp, ListChecks } from "lucide-react";
import Link from "next/link";

export default function StrategyPage() {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    brandPersonality: "",
    preferredChannels: "",
    marketingGoals: ""
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    try {
      const token = localStorage.getItem("token") || "";
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;

      const res = await api.ai.strategy({ 
        userId,
        brandPersonality: formData.brandPersonality,
        preferredChannels: formData.preferredChannels,
        marketingGoals: formData.marketingGoals
      }, token);
      
      if (res.success) {
        setResult(res.data);
        setStep("result");
      } else {
        alert("Error: " + res.error);
        setStep("form");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate strategy");
      setStep("form");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Strategy</h1>
      <p className="text-gray-500 mb-8">Develop a comprehensive roadmap to achieve your business goals.</p>

      {step === "form" && (
        <FadeIn>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Build Your Strategy</h2>
            <p className="text-gray-600 mb-6">
              We'll use your Brand Audit results along with your preferences to create a tailored marketing strategy.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How do you want your brand to be perceived in the market?
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.brandPersonality}
                  onChange={(e) => setFormData({ ...formData, brandPersonality: e.target.value })}
                  placeholder="e.g., Innovative and trustworthy, approachable yet professional, cutting-edge technology leader..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Marketing Channels (Optional)
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.preferredChannels}
                  onChange={(e) => setFormData({ ...formData, preferredChannels: e.target.value })}
                  placeholder="e.g., LinkedIn, Instagram, Email Marketing, Content Marketing..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are your primary marketing goals?
                </label>
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.marketingGoals}
                  onChange={(e) => setFormData({ ...formData, marketingGoals: e.target.value })}
                  placeholder="e.g., Increase brand awareness, generate qualified leads, improve customer retention, launch new product..."
                  rows={3}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Generate Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </FadeIn>
      )}

      {step === "loading" && (
        <AIProgress 
            steps={[
                "Analyzing Brand Audit...",
                "Identifying Growth Channels...",
                "Defining KPIs...",
                "Formulating Tactics...",
                "Finalizing Strategy..."
            ]} 
        />
      )}

      {step === "result" && result && (
        <FadeIn>
          <div className="space-y-6">
            {/* Goal Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-xl text-white shadow-lg">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 mr-2 text-blue-200" />
                <span className="text-sm font-bold uppercase tracking-wider text-blue-200">Primary Goal</span>
              </div>
              <h2 className="text-3xl font-bold">{result.goal}</h2>
              <div className="mt-6 flex items-center text-sm text-blue-100">
                <span className="font-semibold mr-2">Timeline:</span> {result.timeline}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Channels */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-4 text-gray-900">Recommended Channels</h3>
                <div className="flex flex-wrap gap-2">
                  {(result.channels || []).map((channel: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              {/* KPIs */}
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-4 text-gray-900">Key Performance Indicators</h3>
                <ul className="space-y-2">
                  {(result.kpis || []).map((kpi: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-700">
                      <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2" />
                      {kpi}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tactics */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold mb-4 text-gray-900 flex items-center">
                <ListChecks className="mr-2 h-5 w-5 text-gray-500" /> Key Tactics
              </h3>
              <div className="space-y-4">
                {(result.tactics || []).map((tactic: string, i: number) => (
                  <div key={i} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 h-6 w-6 bg-white border rounded-full flex items-center justify-center text-sm font-bold text-gray-500 mr-3">
                      {i + 1}
                    </span>
                    <p className="text-gray-800">{tactic}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Link href="/dashboard/content-calendar">
                <Button size="lg">
                  Create Content Calendar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
