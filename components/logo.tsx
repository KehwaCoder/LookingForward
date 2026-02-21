import Image from "next/image";

export function Logo({ className = "h-auto w-44" }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="Looking Forward Community Programs"
      width={420}
      height={140}
      className={className}
      priority
    />
  );
}
