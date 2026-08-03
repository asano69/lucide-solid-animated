import type { JSX } from "solid-js";

export function Move(props: {
  size?: number;
  color?: string;
}): JSX.Element {
  return (
    <svg
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color ?? "currentColor"}
    >
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}
