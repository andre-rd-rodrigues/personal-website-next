export function injectHeaderIds(htmlContent?: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent || '', 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6'); // Adjust as needed for your content

  headings.forEach((heading, index) => {
    // Create an ID from the heading text
    const id =
      heading
        .textContent!.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${index}`;
    heading.id = id; // Set the ID
  });

  return {
    html: doc.body.innerHTML,
    headings: extractHeadings(doc.body.innerHTML),
  };
}

function extractHeadings(htmlContent: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3');
  return Array.from(headings).map((h) => ({
    text: h.textContent,
    id: h.id,
    level: parseInt(h.tagName.substring(1), 10),
  }));
}
