import markdownit from "markdown-it";
import hljs from "highlight.js"; // https://highlightjs.org

//@ts-ignore
const hljsmd = markdownit({
  //@ts-ignore
  highlight: function (str) {
    return (
      '<pre><code class="hljs">' +
      hljs.highlight(str, { language: "ts", ignoreIllegals: true }).value +
      "</code></pre>"
    );
  },
});

export function getMdRender(md: string) {
  return hljsmd.render(md);
}
