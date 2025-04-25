// src/components/home/WhyChooseUs.js
import React from "react";
import Heading from "@/components/ui/heading";
import { Shield, Gem, Globe, Clock } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Uncompromising Quality",
      description:
        "Each piece is meticulously crafted using premium materials and rigorous quality standards.",
      color: "text-[#11296B]",
      bgColor: "bg-[#11296B]",
      gradientFrom: "from-[#11296B]/10",
      gradientTo: "to-[#11296B]/30",
      borderColor: "border-[#11296B]/20",
    },
    {
      icon: Gem,
      title: "Unique Design",
      description:
        "Our bracelets are more than accessories – they're wearable art that tells a story.",
      color: "text-[#1E96FC]",
      bgColor: "bg-[#1E96FC]",
      gradientFrom: "from-[#1E96FC]/10",
      gradientTo: "to-[#1E96FC]/30",
      borderColor: "border-[#1E96FC]/20",
    },
    {
      icon: Globe,
      title: "Sustainable Practices",
      description:
        "We're committed to ethical sourcing and environmentally responsible production.",
      color: "text-green-600",
      bgColor: "bg-green-600",
      gradientFrom: "from-green-600/10",
      gradientTo: "to-green-600/30",
      borderColor: "border-green-600/20",
    },
    {
      icon: Clock,
      title: "Timeless Elegance",
      description:
        "Designs that transcend trends, creating lasting memories and style.",
      color: "text-purple-600",
      bgColor: "bg-purple-600",
      gradientFrom: "from-purple-600/10",
      gradientTo: "to-purple-600/30",
      borderColor: "border-purple-600/20",
    },
  ];

  return (
    <section className="bg-[#F8F9FC] py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading
          level={2}
          className="text-center mb-12 text-3xl md:text-4xl text-[#11296B] font-light tracking-tight"
        >
          Why <span className="font-semibold">Choose Empress</span>
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`
                group bg-white rounded-xl 
                shadow-md p-6 
                transform transition-all duration-300 
                hover:-translate-y-2 hover:shadow-lg
                text-center
                relative overflow-hidden
                border ${feature.borderColor}
              `}
            >
              {/* Subtle Gradient Overlay */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-br 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 
                  ${feature.gradientFrom} ${feature.gradientTo}
                  z-0
                `}
              />

              <div
                className={`
                  mx-auto w-16 h-16 mb-4 
                  flex items-center justify-center 
                  rounded-full bg-opacity-10 
                  ${feature.color}
                  relative z-10
                  transition-transform duration-300
                  group-hover:scale-110
                `}
              >
                <feature.icon
                  className={`
                    w-8 h-8 
                    ${feature.color}
                    transition-transform duration-300
                    group-hover:scale-90
                  `}
                />
              </div>
              <h3
                className="
                  text-xl font-semibold text-[#11296B] mb-3
                  relative z-10
                "
              >
                {feature.title}
              </h3>
              <p
                className="
                  text-gray-600 text-sm
                  relative z-10
                "
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;