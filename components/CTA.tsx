"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

export const Cta = () => {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to discover your next favorite book?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of readers who use BookAgent to find amazing books
            with AI-powered recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => router.push("/search")}
              className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-3 font-semibold cursor-pointer"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
