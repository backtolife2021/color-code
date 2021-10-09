/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/jsx-no-bind */
import React, { useMemo, useReducer, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Button, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { css } from '@emotion/css'
import { CacheProvider } from '@emotion/react'

import { Preview } from './components/Preview'
import { Setting } from './components/Setting'
import { ChakraProvider } from './ChakraProvider'
import { colors } from './colors'
import { Sidebar } from './layout'
import { create, mount } from './shadowdom'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IInitialState {
  theme: string
  font: string
  fontSize: number
}
export const initialState: IInitialState = {
  theme: 'shadesOfPurple',
  font: 'Fira Code',
  fontSize: 16,
}

export interface IAction {
  type: 'reset' | 'update'
  payload: Partial<IInitialState>
}

export const reducer = (state: IInitialState, action: IAction) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'reset':
      return initialState

    case 'update':
      return {
        ...state,
        ...action.payload,
      }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface changegeProps {
  state: IInitialState
  dispatch: React.Dispatch<IAction>
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return useMemo(
    () => (
      <Sidebar
        left={() => {
          return (
            <>
              <Button
                colorScheme="pink"
                onClick={() => {
                  createApp().hide()
                }}
              >
                hello word
              </Button>
              <Setting {...{ state, dispatch }} />
            </>
          )
        }}
        right={() => {
          return <Preview {...{ state, dispatch }} />
        }}
      />
    ),
    [dispatch, state]
  )
}

export const _createApp = () => {
  // extendTheme 方法用于在默认主题对象的基础上进行扩展

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

export const createApp = singleton(_createApp)
export default createApp
