import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Book Blogger",
      content:
        "BookAgent has revolutionized how I discover new titles. The AI recommendations are incredibly accurate and save me hours of research.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Library Director",
      content:
        "The comprehensive review analysis helps our library make better acquisition decisions. The data quality is outstanding.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Author & Reviewer",
      content:
        "As someone who reads 200+ books a year, BookAgent's discovery features have introduced me to amazing titles I never would have found.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="bg-slate-800 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Loved by Book Enthusiasts
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            See what readers and professionals are saying about BookAgent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index + 1}
              className="bg-slate-700 border-slate-600 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i + 1}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-300 mb-6">"{testimonial.content}"</p>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-slate-400 text-sm">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
