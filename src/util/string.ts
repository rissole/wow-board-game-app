export function toTitleCase(s: string) {
  if (s[0] === undefined) {
    return "";
  }
  return s[0].toUpperCase() + s.substring(1);
}
