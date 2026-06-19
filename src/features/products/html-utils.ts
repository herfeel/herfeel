const namedEntities: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
  rdquo: "”",
  rsquo: "’",
  ldquo: "“",
  lsquo: "‘",
  ndash: "–",
  mdash: "—",
};

export function decodeHtmlEntities(value: string) {
  return value.replace(/&(#x?[\da-f]+|[a-z]+);/gi, (entity, code: string) => {
    if (code.startsWith("#x")) {
      const parsed = Number.parseInt(code.slice(2), 16);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : entity;
    }

    if (code.startsWith("#")) {
      const parsed = Number.parseInt(code.slice(1), 10);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : entity;
    }

    return namedEntities[code.toLowerCase()] ?? entity;
  });
}

export function htmlToText(value: string) {
  return decodeHtmlEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<\/(p|div|h[1-6]|li|ul|ol)>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

export function excerptFromHtml(value: string, maxLength: number) {
  const text = htmlToText(value);

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}...`;
}
