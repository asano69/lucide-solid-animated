import { createAnimatedIcon } from "../createAnimatedIcon";

export default createAnimatedIcon({
  name: "alarm-clock",
  trigger: "hold",
  paths: () => (
    <>
      <path d="M18 20.5L19.5 22" class="primary-path" />
      <path d="M6 20.5L4.5 22" class="primary-path" />
      <path
        d="M21 13C21 17.968 16.968 22 12 22C7.032 22 3 17.968 3 13C3 8.032 7.032 4 12 4C16.968 4 21 8.032 21 13Z"
        class="primary-path"
      />
      <path
        d="M15.339 15.862L12.549 14.197C12.063 13.909 11.667 13.216 11.667 12.649V8.95898"
        class="primary-path"
      />
      <path d="M18 2L21.747 5.31064" class="secondary-path" />
      <path d="M6 2L2.25304 5.31064" class="secondary-path" />
    </>
  ),
  css: `
    .lucide-solid-animated-alarm-clock path {
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .lucide-solid-animated-alarm-clock.animate .primary-path {
      animation: lucide-solid-animated-alarm-clock-primary 0.3s linear infinite;
    }
    .lucide-solid-animated-alarm-clock.animate .secondary-path {
      animation: lucide-solid-animated-alarm-clock-secondary 0.3s linear infinite;
    }
    @keyframes lucide-solid-animated-alarm-clock-primary {
      0%, 100% { transform: translate(0, -1.5px); }
      20%, 60% { transform: translate(-1px, -1.5px); }
      40%, 80% { transform: translate(1px, -1.5px); }
    }
    @keyframes lucide-solid-animated-alarm-clock-secondary {
      0%, 100% { transform: translate(0, -2.5px); }
      20%, 60% { transform: translate(-2px, -2.5px); }
      40%, 80% { transform: translate(2px, -2.5px); }
    }
  `,
});
