import { Shield, Palette, Zap, MonitorSmartphone, BookOpen, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Private",
    description:
      "Your files never leave your device. All processing happens locally in your browser.",
  },
  {
    icon: Palette,
    title: "Reading Themes",
    description:
      "Switch between light, dark, and sepia modes for comfortable reading day or night.",
  },
  {
    icon: Zap,
    title: "Instant Loading",
    description:
      "No uploads, no waiting. Your EPUB opens immediately in the browser.",
  },
  {
    icon: MonitorSmartphone,
    title: "Works Everywhere",
    description:
      "Read on desktop, tablet, or phone. Responsive design adapts to any screen.",
  },
  {
    icon: BookOpen,
    title: "Chapter Navigation",
    description:
      "Jump between chapters with the built-in table of contents sidebar.",
  },
  {
    icon: Lock,
    title: "No Signup Required",
    description:
      "Start reading immediately. No account, no email, no strings attached.",
  },
];

export function Features() {
  return (
    <section className="bg-muted/40 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center">
          Why ZenPub?
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
          The simplest way to read EPUB files online. No installs, no signups,
          no hassle.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="rounded-lg bg-background p-2.5 shadow-sm">
                  <feature.icon className="h-5 w-5" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
