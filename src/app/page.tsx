import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, Calendar, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Your AI-Powered <br />
            <span className="text-blue-600">Marketing Strategist</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Automate brand audits, generate content calendars, and design winning campaigns in seconds with AI Mascot.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to grow</h2>
            <p className="mt-4 text-gray-600">Powerful tools to streamline your marketing workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Brand Audit</h3>
              <p className="text-gray-600">Analyze your brand voice, strengths, and weaknesses instantly with AI.</p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Strategic Planning</h3>
              <p className="text-gray-600">Get data-driven marketing strategies tailored to your industry and goals.</p>
            </div>
            
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Content Calendar</h3>
              <p className="text-gray-600">Generate a month's worth of social media content in one click.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
