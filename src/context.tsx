import { createContext, splitProps, useContext, type JSXElement } from "solid-js";

export interface LucideContextValue {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

export const LucideContext = createContext<LucideContextValue>({
  size: 24,
  color: "currentColor",
  strokeWidth: 2,
  absoluteStrokeWidth: false,
  class: "",
});

export interface LucideProviderProps extends LucideContextValue {
  children: JSXElement;
}

/** Sets default icon props (size, color, strokeWidth, etc.) for all icons rendered inside */
export function LucideProvider(props: LucideProviderProps) {
  const [value, rest] = splitProps(props, [
    "size",
    "color",
    "strokeWidth",
    "absoluteStrokeWidth",
    "class",
  ]);
  return <LucideContext.Provider value={value}>{rest.children}</LucideContext.Provider>;
}
