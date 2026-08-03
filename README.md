# lucide-solid-animated

### Animation behavior

Every icon self-animates when a pointer hovers over it, with no setup required: a one-shot animation plays automatically (duration varies per icon, roughly 200-1500ms), and a few icons instead animate continuously for as long as they're hovered ("hover-hold"). The animate prop is a separate, external trigger: setting it to true plays the animation regardless of hover, and it is OR-ed with the internal hover state, so a parent can trigger the same animation programmatically. There is currently no prop to disable the built-in hover trigger.

---

- https://github.com/lucide-icons/lucide/tree/main/packages/lucide-solid
- https://www.movingicons.dev/icons
- https://github.com/jis3r/icons/blob/main/src/lib/icons/
- https://lucide-animated.com/
- https://github.com/pqoqubbw/icons/tree/main/icons
