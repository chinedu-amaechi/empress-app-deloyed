// src/components/ui/fonts.js


// Import Google Fonts
import {
  Josefin_Sans,
  Inter,
  Poppins,
  Roboto,
  Playfair_Display,
  Cormorant_Garamond,
  Manrope,
  Work_Sans,
  Quicksand,
  Nunito,
  Orbitron,
  Rajdhani,
  Merriweather,
  Lora,
} from "next/font/google";

// Define multiple fonts for easy switching
// Note:
// (Some fonts require an explicit weight specification as they support multiple weights.)
  export const _1 = Josefin_Sans({ subsets: ["latin"], weight: "400" }); // Default
  export const _2 = Inter({ subsets: ["latin"], weight: "400" });
  export const _3 = Poppins({ subsets: ["latin"], weight: "400" });
  export const _4 = Roboto({ subsets: ["latin"], weight: "400" });
  export const _5 = Playfair_Display({ subsets: ["latin"], weight: "400" });
  export const _6 = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });
  export const _7 = Manrope({ subsets: ["latin"], weight: "400" });
  export const _8 = Work_Sans({ subsets: ["latin"], weight: "400" });
  export const _9 = Quicksand({ subsets: ["latin"], weight: "400" });
  export const _10 = Nunito({ subsets: ["latin"], weight: "400" });
  export const _11 = Orbitron({ subsets: ["latin"], weight: "400" });
  export const _12 = Rajdhani({ subsets: ["latin"], weight: "400" });
  export const _13 = Merriweather({ subsets: ["latin"], weight: "400" });
  export const _14 = Lora({ subsets: ["latin"], weight: "400" });


// Change the active font here
export const activeFont = _1;
