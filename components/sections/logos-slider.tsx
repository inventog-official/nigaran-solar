import Image from "next/image";
import { Badge } from "../ui/badge";
import { ProgressiveBlur } from "../ui/progressive-blur";

export function LogosSlider() {
  const logos = [
    "/Brand Logo/logos_Adani.webp",
    "/Brand Logo/logos_Enphase.webp",
    "/Brand Logo/logos_Goldi.webp",
    "/Brand Logo/logos_Polycab.webp",
    "/Brand Logo/logos_Premier Energies.webp",
    "/Brand Logo/logos_Rayzon Solar.webp",
    "/Brand Logo/logos_renew.webp",
    "/Brand Logo/logos_Saatvik.webp",
    "/Brand Logo/logos_Sungrow.webp",
    "/Brand Logo/logos_Vikram Solar.webp",
  ];

  return (
    <div className="relative h-[200px] flex flex-col items-center justify-center pt-6   w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="max-w-2xl text-3xl font-extrabold text-primary md:text-4xl">
          Trusted By
        </h2>
        <Badge variant="outline">these companies</Badge>
      </div>

      {/* Scroll wrapper */}
      <div className="flex items-center h-full gap-12 w-max animate-slide">
        {logos.map((image, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-shrink-0 w-32"
          >
            <Image
              src={image}
              alt={`${image
                .split("/")
                .pop()
                ?.replace(".webp", "")
                .replace(
                  "logos_",
                  ""
                )} logo - Trusted partner of Nigaran Solar`}
              title={`${image
                .split("/")
                .pop()
                ?.replace(".webp", "")
                .replace(
                  "logos_",
                  ""
                )} logo - Trusted partner of Nigaran Solar`}
              width={100}
              height={100}
              className="object-contain transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))}
        {/* Duplicate set for seamless looping */}
        {logos.map((image, index) => (
          <div
            key={`duplicate-${index}`}
            className="flex items-center justify-center flex-shrink-0 w-32"
          >
            <Image
              src={image}
              alt={`${image
                .split("/")
                .pop()
                ?.replace(".webp", "")
                .replace(
                  "logos_",
                  ""
                )} logo - Trusted partner of Nigaran Solar`}
              title={`${image
                .split("/")
                .pop()
                ?.replace(".webp", "")
                .replace(
                  "logos_",
                  ""
                )} logo - Trusted partner of Nigaran Solar`}
              width={128}
              height={28}
              className="object-contain transition-transform duration-300 ease-in-out md:w-20 md:h-20 lg:w-24 lg:h-24 hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Left smooth blur edge */}
      {/* <div className="pointer-events-none absolute top-0 left-0 h-full w-[50px] lg:w-[200px] bg-gradient-to-r from-white via-white/60 via-70% to-transparent backdrop-blur-sm z-20" /> */}

      {/* Right smooth blur edge */}
      {/* <div className="pointer-events-none absolute top-0 right-0 h-full w-[50px] lg:w-[200px] bg-gradient-to-l from-white via-white/60 via-70% to-transparent backdrop-blur-sm z-20" /> */}
    </div>
  );
}
