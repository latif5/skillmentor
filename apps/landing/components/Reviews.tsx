import { Star } from "lucide-react";

export function Reviews() {
  const reviews = [
    {
      name: "Alex Johnson",
      role: "Medical Student",
      initials: "AJ",
      bg: "bg-indigo-100",
      text: "SkillMentor completely changed how I study for my boards. The spaced repetition algorithm is spot on.",
    },
    {
      name: "Sarah Lee",
      role: "Language Enthusiast",
      initials: "SL",
      bg: "bg-purple-100",
      text: "I learned Spanish in record time using the Match mode. It makes learning vocabulary actually fun!",
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      initials: "MC",
      bg: "bg-emerald-100",
      text: "Great for memorizing syntax and concepts. The clean UI and dark mode are perfect for late-night study sessions.",
    },
  ];

  return (
    <div id="reviews" className="flex flex-col gap-10 z-10 w-full relative gap-x-10 gap-y-10 animate-fade-up delay-200 scroll-mt-24">
      <div className="flex flex-col md:items-center md:text-center justify-between gap-6 px-1">
        <div className="max-w-2xl">
          <h2 className="md:text-4xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
            Loved by Students
          </h2>
          <p className="leading-relaxed text-base font-normal text-zinc-500">
            Join thousands of learners who have improved their grades and mastered new skills with SkillMentor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <div
            key={i}
            className={`flex flex-col p-8 bg-zinc-50 rounded-[2rem] border border-zinc-200 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out animate-fade-up`}
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-amber-400 fill-current" />
              ))}
            </div>
            <p className="text-zinc-600 leading-relaxed mb-6 font-medium">"{review.text}"</p>
            <div className="mt-auto flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full ${review.bg} flex items-center justify-center text-zinc-700 font-bold text-sm`}
              >
                {review.initials}
              </div>
              <div>
                <p className="text-zinc-900 font-semibold text-sm">{review.name}</p>
                <p className="text-zinc-500 text-xs">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
