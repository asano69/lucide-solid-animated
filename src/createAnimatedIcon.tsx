import { createSignal, splitProps, useContext } from "solid-js";
import type { JSX } from "solid-js";
import type { IconProps } from "./types";
import { injectIconStyle } from "./styleInjector";
import { LucideContext } from "./context";
import defaultAttributes from "./defaultAttributes";

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
  /**
   * Hover behavior for this icon:
   * - "one-shot" (default): a single animation plays once per hover, and
   *   resets as soon as the CSS animation ends (so hovering again retriggers it).
   * - "hold": the animation keeps running for as long as the pointer stays
   *   over the icon, and stops on mouseleave.
   */
  trigger?: "one-shot" | "hold";
}

/** True if the caller already supplied their own accessible name/hidden state */
function hasA11yProp(rest: Record<string, unknown>): boolean {
  return "aria-label" in rest || "aria-labelledby" in rest || "aria-hidden" in rest;
}

/**
 * Creates an animated icon component in the lucide-solid style.
 * Individual icons only supply their paths and animation CSS; hover
 * handling, prop forwarding, and style injection are shared here.
 */
export function createAnimatedIcon(options: AnimatedIconOptions) {
  const { name, paths, css, trigger = "one-shot" } = options;
  const baseClass = `lucide-solid-animated lucide-solid-animated-${name}`;

  injectIconStyle(name, css);

  return function AnimatedIcon(props: IconProps): JSX.Element {
    const [local, rest] = splitProps(props, [
      "color",
      "size",
      "strokeWidth",
      "absoluteStrokeWidth",
      "animate",
      "class",
      "classList",
      "children",
      "onMouseEnter",
      "onMouseLeave",
      "onAnimationEnd",
    ]);

    const globalProps = useContext(LucideContext);

    const [hoverAnimate, setHoverAnimate] = createSignal(false);

    // `animate` is an external trigger and is OR-ed with the internal hover
    // state, so a parent can play the same animation programmatically.
    const isAnimating = () => (local.animate ?? false) || hoverAnimate();
    const size = () => local.size ?? globalProps.size ?? defaultAttributes.width;
    const strokeWidth = () =>
      local.strokeWidth ?? globalProps.strokeWidth ?? defaultAttributes["stroke-width"];

    // Simplification: only the plain-function form of these handlers is
    // forwarded here (not Solid's [handler, data] tuple form), since icons
    // are expected to be simple leaf components.
    function handleMouseEnter(event: MouseEvent) {
      if (trigger === "hold" || !isAnimating()) {
        setHoverAnimate(true);
      }
      if (typeof local.onMouseEnter === "function") {
        (local.onMouseEnter as (e: MouseEvent) => void)(event);
      }
    }

    // Only "hold" icons need to stop on mouseleave; "one-shot" icons already
    // reset themselves via handleAnimationEnd below.
    function handleMouseLeave(event: MouseEvent) {
      if (trigger === "hold") {
        setHoverAnimate(false);
      }
      if (typeof local.onMouseLeave === "function") {
        (local.onMouseLeave as (e: MouseEvent) => void)(event);
      }
    }

    // Only "one-shot" icons reset here; "hold" icons keep animating until
    // mouseleave regardless of how many animation iterations have played.
    function handleAnimationEnd(event: AnimationEvent) {
      if (trigger === "one-shot") {
        setHoverAnimate(false);
      }
      if (typeof local.onAnimationEnd === "function") {
        (local.onAnimationEnd as (e: AnimationEvent) => void)(event);
      }
    }

    return (
      <svg
        xmlns={defaultAttributes.xmlns}
        width={size()}
        height={size()}
        viewBox={defaultAttributes.viewBox}
        fill={defaultAttributes.fill}
        stroke={local.color ?? globalProps.color ?? defaultAttributes.stroke}
        stroke-width={
          (local.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth)
            ? (Number(strokeWidth()) * 24) / Number(size())
            : strokeWidth()
        }
        stroke-linecap={defaultAttributes["stroke-linecap"]}
        stroke-linejoin={defaultAttributes["stroke-linejoin"]}
        class={[baseClass, globalProps.class, local.class].filter(Boolean).join(" ")}
        classList={{ animate: isAnimating(), ...local.classList }}
        aria-hidden={!local.children && !hasA11yProp(rest) ? "true" : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onAnimationEnd={handleAnimationEnd}
        {...rest}
      >
        {paths()}
      </svg>
    );
  };
}
