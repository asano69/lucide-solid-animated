import { createAnimatedIcon } from "../createAnimatedIcon";

export default createAnimatedIcon({
  name: "book",
  paths: () => (
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
  ),
  css: `
    .lucide-solid-animated-book.animate {
      animation: lucide-solid-animated-book 0.6s ease-in-out;
    }
    @keyframes lucide-solid-animated-book {
      0% { transform: scale(1) rotate(0deg) translateY(0); }
      20% { transform: scale(1.04) rotate(-8deg) translateY(-2px); }
      50% { transform: scale(1.04) rotate(8deg) translateY(-2px); }
      80% { transform: scale(1.04) rotate(-8deg) translateY(-2px); }
      100% { transform: scale(1) rotate(0deg) translateY(0); }
    }
  `,
});
