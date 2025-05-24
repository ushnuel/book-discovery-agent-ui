"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="bg-slate-900 pt-40 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-900"></div>
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Discover Books with
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Powered Search
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Find your next great read with our intelligent book discovery agent.
            View reviews, ratings, and recommendations from across the web in
            seconds.
          </p>
          <Button
            size="lg"
            onClick={() => router.push("/search")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-2xl font-semibold rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Discover Now
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
