/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useRef } from 'react'
import styled from '@emotion/styled'
import Highlight, { defaultProps } from 'prism-react-renderer'

import { changegeProps } from './App'
import { themes } from './themes'

const exampleCode = `
import something from 'something'

// 获取并设置样式
const setStyle = () => {
  // 获取主题样式并添加
  const themeStyle = GM_getValue(currentTheme)

  if (themeStyle) {
    GM_addStyle(themeStyle)
  } else {
    const themeUrl = \`https://cdn.bootcss.com/highlight.js/9.15.10/styles/\${currentTheme}.min.css\`

    fetchStyleText(themeUrl).then(style => {
      GM_addStyle(style)
      GM_setValue(currentTheme, style)
    })
  }
}

export default something
`.trim()

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`
const LineNo = styled.span`
  display: inline-block;
  width: 2em;
  user-select: none;
  opacity: 0.3;
`

export const Preview: React.FC<changegeProps> = (props) => {
  const { state } = props
  const fontRef = useRef<HTMLPreElement>(null)
  useEffect(() => {
    const font = fontRef.current
    if (font) {
      font.style.fontFamily = state.font
      font.style.fontSize = state.fontSize.toString() + 'px'
    }
  }, [state.font, state.fontSize])

  return useMemo(
    () => (
      <Highlight
        {...defaultProps}
        theme={themes[state.theme]}
        code={exampleCode}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style} ref={fontRef}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        )}
      </Highlight>
    ),
    [state]
  )
}
