"use client";

import { ModernPricingPage, PricingCardProps } from "@/components/ui/animated-glassy-pricing";

const plans: PricingCardProps[] = [
  {
    planName: "Essential",
    description: "Single room or targeted fix",
    price: "R 8,500",
    period: "per project",
    features: [
      "Single trade service (painting, tiling, or plumbing)",
      "Free on-site assessment",
      "3-day turnaround estimate",
      "Basic warranty coverage",
      "WhatsApp support",
    ],
    buttonText: "Get a Quote",
    buttonVariant: "secondary",
    isPopular: false,
  },
  {
    planName: "Premium",
    description: "Full room or multi-trade",
    price: "R 25,000",
    period: "per project",
    features: [
      "Up to 3 trades combined",
      "Kitchen or bathroom full fit-out",
      "Materials sourcing & supply",
      "Project management included",
      "6-month workmanship warranty",
      "Priority scheduling",
    ],
    buttonText: "Start Your Project",
    buttonVariant: "primary",
    isPopular: true,
  },
  {
    planName: "Full Build",
    description: "Complete renovation or mobile home",
    price: "Custom Quote",
    features: [
      "All trades — end-to-end build",
      "Mobile home or caravan builds",
      "Architectural consultation",
      "Custom cabinetry & flooring",
      "Electrical & plumbing complete",
      "12-month warranty",
      "Dedicated project manager",
    ],
    buttonText: "Book Consultation",
    buttonVariant: "primary",
    isPopular: false,
  },
];

export default function PackagesSection() {
  return (
    <section id="packages" className="py-24 bg-brand-black relative overflow-hidden">
      <ModernPricingPage
        title="Choose Your Package"
        subtitle="Transparent pricing, no hidden costs. Every package includes a free consultation."
        plans={plans}
        showAnimatedBackground={true}
      />
    </section>
  );
}
