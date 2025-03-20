export const autoSuggestQuery = (query) => {
  if (!query.trim()) return "intitle:index.of";

  const suggestions = [
    `site:${query}`,
    `filetype:pdf ${query}`,
    `intitle:index.of ${query}`,
    `"${query}"`,
    `inurl:${query}`,
    `intext:${query}`,
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};
