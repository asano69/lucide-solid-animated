import type { JSX } from "solid-js";

// Extend the native svg attributes so consumers can pass onClick, aria-*,
// data-*, ref, etc. straight through — same contract as lucide-solid.
export interface IconProps extends Omit<
  JSX.SvgSVGAttributes<SVGSVGElement>,
  "color"
> {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  /** Force the animation to always play, instead of only on hover */
  animate?: boolean;
}
