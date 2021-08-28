/* eslint-disable react/jsx-no-bind */
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import { Button, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { css } from '@emotion/css'
import { CacheProvider } from '@emotion/react'

import { ChakraProvider } from './ChakraProvider'
import { colors } from './colors'
import { Sidebar } from './layout'
import { create, mount } from './shadowdom'

interface IAppProps {}

const App: React.FC<IAppProps> = (props) => {
  return useMemo(
    () => (
      <Sidebar
        left={() => {
          return <Button title="222">223</Button>
        }}
        right={() => {
          return 'right'
        }}
      />
    ),
    []
  )
}

export const createApp = () => {
  const stripe = extendTheme({
    colors: { ...colors },
  })

  const { head, main, parasitifer } = create()

  parasitifer.classList.add(
    css`
      display: none;
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 9999;
      width: 100vw;
      height: 100vh;
      font-size: 16px;
      background-color: #fff;
    `
  )

  const show = () => {
    parasitifer.style.display = 'block'
  }

  const hide = () => {
    parasitifer.style.display = 'none'
  }

  mount('last', parasitifer)

  /** @see https://emotion.sh/docs/@emotion/cache#createcache */
  const cacheEmotionForShadowDom = createCache({
    key: 'userscript-shadow-dom',
    container: head,
  })

  ReactDOM.render(
    <CacheProvider value={cacheEmotionForShadowDom}>
      <ChakraProvider theme={stripe}>
        <App />
      </ChakraProvider>
    </CacheProvider>,
    main
  )

  return {
    show,
    hide,
  }
}

export const singleton = <A extends any[], R>(
  factory: (...args: A) => R
): ((...args: A) => R) => {
  let instance: R

  return (...args) => {
    if (!instance) {
      instance = factory(...args)
    }

    return instance
  }
}

export default singleton(createApp)
