export default function hashCode(string) {
  var hash = 0,
    i,
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 13) - hash + chr;

    hash |= 0;
  }

  return hash;
}
