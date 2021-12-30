import prettier from 'prettier'
import shiki from 'shiki'

import createApp from './App'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
GM.registerMenuCommand('Setting', () => {
  createApp().show()
})

const isDev = true
const log = (...any) => {
  if (isDev) {
    console.log(...any)
  }
}

const highlight = () => {
  void shiki
    .getHighlighter({
      langs: [...shiki.BUNDLED_LANGUAGES],
      theme: 'dracula',
    })
    .then((highlighter) => {
      Array.from(document.querySelectorAll('pre')).forEach((pre) => {
        if (pre.dataset.isHighlighted === 'true') return void 0

        const rawCodeText = pre.textContent!
        const code = highlighter.codeToHtml(
          (() => {
            try {
              return prettier.format(rawCodeText, {
                parser: 'babel-ts',
                plugins: (window as any).prettierPlugins,
                semi: false,
                trailingComma: 'all',
                singleQuote: true,
                arrowParens: 'always',
                endOfLine: 'lf',
              })
            } catch {
              return rawCodeText
            }
          })(),
          { lang: 'tsx' }
        )

        /**
         * @see https://stackoverflow.com/a/67571022/11791657
         * @see https://prettier.io/docs/en/browser.html#global
         */
        const range = document.createRange()
        const fragment = range.createContextualFragment(
          code.replace(
            'class="shiki"',
            () => 'class="shiki notranslate" data-is-highlighted="true"'
          )
        )
        pre.replaceWith(fragment)
      })
    })
}

highlight()

// const body = document.body
// const option = {
//   childList: true,
//   subtree: true,
// }

// let time = 0

// const MutationObserver = window.MutationObserver

// const observer = new MutationObserver((mutations, observer_) => {
//   // 处于过于频繁的 DOM 变更时, 暂停监听 50ms, 并放弃累积的未处理的变更事件
//   if (time >= 20) {
//     observer_.disconnect()
//     observer_.takeRecords()
//     time = 0
//     setTimeout(function () {
//       observer_.observe(body, option)
//     }, 50)
//   }

//   highlight()

//   time++
//   log(`第${time}次执行: highlight`)
// })

// observer.observe(body, option)
