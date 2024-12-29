import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { Link } from "@tanstack/react-router";

interface AnimatedTextProps {
  textitle: string;
  img?: React.ReactNode;
  url: string;
}

export function AnimatedText({ textitle,img,url }: AnimatedTextProps) {
  return (
    <div className=" cursor-pointer">
      <Link to={url}>
      <AnimatedGradientText>
        {img} <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          )}
        >
          {textitle}
        </span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </AnimatedGradientText>
      </Link>
    </div>
  );
}
