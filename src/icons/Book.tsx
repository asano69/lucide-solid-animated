import { createSignal, onCleanup } from "solid-js";
import type { JSX } from "solid-js";
import type { IconProps } from "../types";

export function Book(props: IconProps): JSX.Element {
  const [hoverAnimate, setHoverAnimate] = createSignal(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  const animate = () => (props.animate ?? false) || hoverAnimate();

  function handleMouseEnter() {
    if (animate()) return;
    setHoverAnimate(true);
    resetTimer = setTimeout(() => setHoverAnimate(false), 600);
  }

  onCleanup(() => clearTimeout(resetTimer));

  return (
    <div
      class={props.class ?? ""}
      aria-label="book"
      role="img"
      onMouseEnter={handleMouseEnter}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size ?? 24}
        height={props.size ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={props.color ?? "currentColor"}
        stroke-width={props.strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
        class="book-icon"
        classList={{ animate: animate() }}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </svg>
      <style>{`
        div {
          display: inline-block;
        }
        .book-icon {
          overflow: visible;
        }
        .book-icon.animate {
          animation: bookAnimation 0.6s ease-in-out;
        }
        @keyframes bookAnimation {
          0% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
          20% {
            transform: scale(1.04) rotate(-8deg) translateY(-2px);
          }
          50% {
            transform: scale(1.04) rotate(8deg) translateY(-2px);
          }
          80% {
            transform: scale(1.04) rotate(-8deg) translateY(-2px);
          }
          100% {
            transform: scale(1) rotate(0deg) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
