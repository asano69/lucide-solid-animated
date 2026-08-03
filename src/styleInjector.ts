const injectedNames = new Set<string>();

/**
 * Injects a <style> block into <head> for a given icon name exactly once,
 * no matter how many instances of that icon are rendered.
 */
export function injectIconStyle(name: string, css: string): void {
  if (injectedNames.has(name) || typeof document === "undefined") return;
  injectedNames.add(name);

  const style = document.createElement("style");
  style.setAttribute("data-lucide-solid-animated", name);
  style.textContent = css;
  document.head.appendChild(style);
}
