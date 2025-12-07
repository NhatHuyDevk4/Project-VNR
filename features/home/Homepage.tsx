import AnimatedTitle from "./components/AnimatedTitle";
import ScrollDownButton from "@/features/home/components/ScrollDownButton";

const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl w-full">
        {/* Animated Title */}
        <AnimatedTitle />
      </div>

      {/* Scroll Down Button */}
      <ScrollDownButton />
    </div>
  );
};

export default Homepage;
