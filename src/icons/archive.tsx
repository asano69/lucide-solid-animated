import { createAnimatedIcon } from "../createAnimatedIcon";

export default createAnimatedIcon({
  name: "archive",
  paths: () => (
    <>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </>
  ),
  trigger: "hold",
  css: `
    .lucide-solid-animated-archive rect,
    .lucide-solid-animated-archive path {
      transition: transform 0.2s ease-in;
    }
    .lucide-solid-animated-archive.animate rect {
      transform: translateY(-2px);
    }
    .lucide-solid-animated-archive.animate path {
      transform: translateY(2px);
    }
  `,
});
