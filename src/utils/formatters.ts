export const formatCode = (code: string): string => {
  return code.trim()
}

export const highlightSyntax = (code: string): string => {
  // Simple syntax highlighting - in production, use a library like Prism.js or highlight.js
  return code
    .replace(/(const|let|var|function|async|await|return|if|else|for|while|class|new|this)/g, '<span class="text-purple-400">$1</span>')
    .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    .replace(/(["'].*?["'])/g, '<span class="text-yellow-400">$1</span>')
    .replace(/(\d+)/g, '<span class="text-blue-400">$1</span>')
}

