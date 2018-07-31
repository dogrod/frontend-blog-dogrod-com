/**
 * Reference from
 * https://shuheikagawa.com/blog/2015/09/21/using-highlight-js-with-marked/
 */
import * as highlightjs from 'highlightjs'

import marked from 'marked'

import '@/assets/styles/markdown.scss'
import '@/assets/styles/highlightjs/solarized-dark.css'

// Create custom renderer
const renderer = new marked.Renderer()
renderer.code = (code, language = 'javascript') => {
  // Check thether the given language is valid for highlight.js
  const validLang = !!(language && highlightjs.getLanguage(language))
  // Highlight valid language
  const highlighted = validLang
    ? highlightjs.highlight(language, code).value
    : code
  // Render code with 'hljs' class
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`
}

// Set the renderer to marked
marked.setOptions({
  renderer,
})

export default marked