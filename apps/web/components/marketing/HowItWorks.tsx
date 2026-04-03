import { Upload, BookOpen, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "1",
    title: "Upload",
    description: "Drag and drop your EPUB file or click to browse.",
  },
  {
    icon: BookOpen,
    step: "2",
    title: "Read",
    description: "Your book opens instantly in a clean, distraction-free reader.",
  },
  {
    icon: Sparkles,
    step: "3",
    title: "Enjoy",
    description: "Customize themes, fonts, and navigate chapters with ease.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.step} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="rounded-full bg-primary p-4">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-bold shadow-sm border">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
