import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Lora, DM_Sans } from "next/font/google";

const lora = Lora({ subsets: ["latin"], weight: ["500", "600"], style: ["italic", "normal"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0E211C] ${dmSans.className}`}>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[.04]">
        <filter id="notFoundGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#notFoundGrain)" />
      </svg>

      <div className="relative z-10 text-center px-6">
        <p className={`${lora.className} italic text-sm text-[#D79A2C] mb-4`}>Page not found</p>
        <h1 className={`${lora.className} text-5xl sm:text-6xl font-semibold text-[#F7F2E9] mb-5`}>404</h1>
        <p className="text-sm sm:text-base text-[#AAB6A2] mb-8">
          This page doesn&apos;t exist, or may have moved. You&apos;ll be
          redirected to the homepage shortly.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
