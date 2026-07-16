import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function SecurityIllustrationPanel({
  icon: HeroIcon,
  heading,
  subheading,
  benefits,
}: {
  icon: LucideIcon;
  heading: string;
  subheading: string;
  benefits: Benefit[];
}) {
  return (
    <div className="max-w-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-primary/10"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white shadow-lg">
          <HeroIcon className="h-11 w-11" />
        </div>
      </motion.div>
      <h2 className="text-xl font-bold tracking-tight">{heading}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{subheading}</p>
      <div className="mt-6 space-y-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <b.icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{b.title}</p>
              <p className="text-xs text-muted-foreground">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
