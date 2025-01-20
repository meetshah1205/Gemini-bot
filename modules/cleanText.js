const cleanText = (text) => {
    // Remove markdown-style formatting like **bold**, *italic*, and links
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1')  // remove **bold**
        .replace(/\*(.*?)\*/g, '$1')      // remove *italic*
        .replace(/\[.*?\]\(.*?\)/g, '')    // remove links like [text](url)
        .replace(/`(.*?)`/g, '$1')         // remove inline code (`code`)
        .replace(/\n+/g, '\n')             // remove extra newlines
        .trim();                          // trim leading/trailing spaces
};

module.exports = cleanText;