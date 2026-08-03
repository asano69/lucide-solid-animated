import { createSignal, onCleanup, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import type { IconProps } from "./types";
import { injectIconStyle } from "./styleInjector";

const ANIMATION_RESET_MS = 600;

export interface AnimatedIconOptions {
  /** Unique icon name; used for the base class and as the style-injection key */
  name: string;
  /**
   * Returns this icon's SVG path elements. Must be a function (not a plain
   * JSX.Element) so a fresh node is created for every rendered instance —
   * reusing one JSX.Element across instances would make Solid move the same
   * DOM node between icons instead of cloning it.
   */
  paths: () => JSX.Element;
  /** This icon's keyframes/animation rule, injected once per icon name */
  css: string;
}

/**
 * Creates an animated icon component in the lucide-solid style.
 * Individual icons only supply their paths and animation CSS; hover
 * handling, prop forwarding, and style injection are shared here.
 */
export function createAnimatedIcon(options: AnimatedIconOptions) {
  const { name, paths, css } = options;
  const baseClass = `lucide-solid-animated lucide-solid-animated-${name}`;

  injectIconStyle(name, css);

  return function AnimatedIcon(props: IconProps): JSX.Element {
    const [local, rest] = splitProps(props, [
      "color",
      "size",
      "strokeWidth",
      "animate",
      "class",
      "classList",
      "onMouseEnter",
    ]);

    const [hoverAnimate, setHoverAnimate] = createSignal(false);
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const isAnimating = () => (local.animate ?? false) || hoverAnimate();

    // Simplification: only the plain-function form of onMouseEnter is
    // forwarded here (not Solid's [handler, data] tuple form), since icons
    // are expected to be simple leaf components.
    function handleMouseEnter(event: MouseEvent) {
      if (!isAnimating()) {
        setHoverAnimate(true);
        resetTimer = setTimeout(() => setHoverAnimate(false), ANIMATION_RESET_MS);
      }
      if (typeof local.onMouseEnter === "function") {
        (local.onMouseEnter as (e: MouseEvent) => void)(event);
      }
    }

    onCleanup(() => clearTimeout(resetTimer));

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={local.size ?? 24}
        height={local.size ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke={local.color ?? "currentColor"}
        stroke-width={local.strokeWidth ?? 2}
        stroke-linecap="round"
        stroke-linejoin="round"
        role="img"
        aria-label={name}
        class={`${baseClass} ${local.class ?? ""}`.trim()}
        classList={{ animate: isAnimating(), ...local.classList }}
        onMouseEnter={handleMouseEnter}
        {...rest}
      >
        {paths()}
      </svg>
    );
  };
}
