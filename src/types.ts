import type { JSX } from "solid-js";

// Extend the native svg attributes so consumers can pass onClick, aria-*,
// data-*, ref, etc. straight through — same contract as lucide-solid.
type SvgAttributesWithoutColor = Omit<
  JSX.SvgSVGAttributes<SVGSVGElement>,
  "color"
>;

export interface IconProps extends SvgAttributesWithoutColor {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  /** Force the animation to always play, instead of only on hover */
  animate?: boolean;
  /** When true, keep the visual stroke width constant regardless of `size` */
  absoluteStrokeWidth?: boolean;
}
