export function classes(
  base: string = "",
  classList: Record<string, boolean>
): string {
  return Object.entries(classList)
    .filter(([_, value]) => value)
    .map(([name]) => name)
    .concat(base)
    .join(" ");
}
