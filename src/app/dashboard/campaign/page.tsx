"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AIProgress } from "@/components/ui/ai-progress";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight, Megaphone, Rocket } from "lucide-react";

export default function CampaignPage() {
  const [step, setStep] = useState<"form" | "loading" | "result">("form");
  const [campaignName, setCampaignName] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    try {
      const token = localStorage.getItem("token") || "";
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;

      const res = await api.ai.campaign({ userId, campaignName }, token);
      
      if (res.success) {
        setResult(res.data);
        setStep("result");
      } else {
        alert("Error: " + res.error);
        setStep("form");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to generate campaign");
      setStep("form");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Planner</h1>
      <p className="text-gray-500 mb-8">Design high-impact marketing campaigns.</p>

      {step === "form" && (
        <FadeIn>
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <div className="text-center mb-8">
                <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Megaphone className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">What's your campaign about?</h2>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name / Theme</label>
                <Input
                  required
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g. Summer Sale, Product Launch"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Launch Campaign Planning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </FadeIn>
      )}

      {step === "loading" && (
        <AIProgress 
            steps={[
                "Analyzing Market Trends...",
                "Defining Campaign Concept...",
                "Structuring Channels...",
                "Drafting Key Messages...",
                "Finalizing Campaign Plan..."
            ]} 
        />
      )}

      {step === "result" && result && (
        <FadeIn>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 p-8 rounded-xl text-white shadow-lg">
                <div className="flex items-center mb-2">
                    <Rocket className="h-6 w-6 mr-2 text-orange-100" />
                    <span className="text-sm font-bold uppercase tracking-wider text-orange-100">Campaign Concept</span>
                </div>
                <h2 className="text-3xl font-bold mb-4">{result.concept}</h2>
                <p className="text-orange-50 text-lg">{result.hook}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-4 text-gray-900">Channels & Strategy</h3>
                    <ul className="space-y-3">
                        {(result.channels || []).map((channel: string, i: number) => (
                            <li key={i} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                                <span className="h-2 w-2 bg-orange-500 rounded-full mr-3"></span>
                                {channel}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 className="font-semibold mb-4 text-gray-900">Timeline</h3>
                    <div className="space-y-4">
                        {(result.timeline || []).map((item: string, i: number) => (
                            <div key={i} className="flex items-start">
                                <span className="font-bold text-orange-600 mr-2 min-w-[4rem]">Phase {i+1}:</span>
                                <span className="text-gray-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-4 text-gray-900">Budget Allocation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(result.budgetAllocation || {}).map(([key, value]: [string, any], i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg text-center">
                            <div className="text-sm text-gray-500 uppercase font-bold mb-1">{key}</div>
                            <div className="text-xl font-bold text-gray-900">{value}</div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
