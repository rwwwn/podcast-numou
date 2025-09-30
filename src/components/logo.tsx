// components/logo.tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo.svg" // أو png
      alt="بودكاست نمو"
      width={120}
      height={28}
      priority
      className={cn("h-7 w-auto", className)}
    />
  );
};