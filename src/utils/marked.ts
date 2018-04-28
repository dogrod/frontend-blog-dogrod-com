/**
 * Reference from
 * https://shuheikagawa.com/blog/2015/09/21/using-highlight-js-with-marked/
 */
import * as marked from 'marked'
import * as highlightjs from 'highlight.js'

// Create your custom renderer.
const renderer = new marked.Renderer()
renderer.code = (code, language = 'javascript') => {
  // Check whether the given language is valid for highlight.js.
  const validLang = !!(language && highlightjs.getLanguage(language))
  // Highlight only if the language is valid.
  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
  // Render the highlighted code with `hljs` class.
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

// Set the renderer to marked.
marked.setOptions({ renderer });

export default marked