import { useEffect } from "react";
import gsap from "gsap";

const GlassMorphicCard = ({ children, total, title }) => {
  useEffect(() => {
    // GSAP Animations
    gsap.fromTo(
      ".card-container",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );

    gsap.fromTo(
      ".icon-circle",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "bounce.out" }
    );

    gsap.fromTo(
      ".card-title",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      ".card-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" }
    );

    gsap.fromTo(
      ".button",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="card-container max-w-xs rounded-3xl mb-3 border border-white/30 bg-white/30 backdrop-blur-md py-6 px-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl dark:border-gray-700 dark:bg-gray-800/30 dark:hover:scale-105 dark:hover:shadow-3xl">
      <div className="icon-circle flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg dark:from-indigo-700 dark:to-blue-800">
        {children}
      </div>

      <div className="mt-6 text-center">
        <h4 className="card-title text-3xl font-semibold text-gray-900 dark:text-white">
          {total}
        </h4>
        <span className="card-subtitle text-xl font-medium text-gray-500 dark:text-gray-400">{title}</span>
      </div>
    </div>
  );
};

export default GlassMorphicCard;
