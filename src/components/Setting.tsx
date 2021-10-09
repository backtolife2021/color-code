/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useMemo } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Switch,
  useBoolean,
} from '@chakra-ui/react'

import { changegeProps } from '../app'
import { fonts } from '../fonts'
import { themes } from '../themes'

export const Setting: React.FC<changegeProps> = (props) => {
  const { state, dispatch } = props

  const [isThemeChanges, setIsThemeChanges] = useBoolean(true)
  const [isFontChanges, setIsFontChanges] = useBoolean(true)

  const [isForceThemeBackground, setIsForceThemeBackground] = useBoolean(false)
  const [isGWF, setIsGWF] = useBoolean(true)

  return useMemo(
    () => (
      <div className="setting">
        <Box borderWidth="1px" borderRadius="10" padding="7">
          {/* 主题类型 */}
          <label>
            Themes
            <Select
              value={state.theme}
              borderRadius="20"
              onChange={(event) => {
                if (isThemeChanges) {
                  dispatch({ type: 'update', payload: { theme: event.target.value } })
                }
              }}
            >
              {Object.keys(themes).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          </label>

          {/* 字体类型 */}
          <label>
            Monospace Fonts
            <Select
              value={state.font}
              borderRadius="20"
              onChange={(event) => {
                if (isFontChanges) {
                  dispatch({ type: 'update', payload: { font: event.target.value } })
                }
              }}
            >
              {fonts.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          </label>

          {/* 字体大小 */}
          <label>
            Font Size
            <Slider
              aria-label="slider-ex-2"
              colorScheme="pink"
              value={state.fontSize}
              min={8}
              max={24}
              onChange={(value) => {
                if (isFontChanges) {
                  dispatch({
                    type: 'update',
                    payload: { fontSize: value },
                  })
                }
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </label>

          {/* 是否应用主题 */}
          <label>
            Apply theme changes
            <FormControl display="flex" alignItems="center">
              <Switch
                id="apply-theme"
                isChecked={isThemeChanges}
                onChange={setIsThemeChanges.toggle}
              />
              <FormLabel htmlFor="apply-theme" ml="3">
                {isThemeChanges ? 'Yes' : 'No'}
              </FormLabel>
            </FormControl>
          </label>

          {/* 是否改变字体 */}
          <label>
            Apply font changes
            <FormControl display="flex" alignItems="center">
              <Switch
                id="font-change"
                isChecked={isFontChanges}
                onChange={setIsFontChanges.toggle}
              />
              <FormLabel htmlFor="font-change" ml="3">
                {isFontChanges ? 'Yes' : 'No'}
              </FormLabel>
            </FormControl>
          </label>

          {/* 强制改变主题背景 */}
          <label>
            Force theme background
            <FormControl display="flex" alignItems="center">
              <Switch
                id="force-theme"
                isChecked={isForceThemeBackground}
                onChange={setIsForceThemeBackground.toggle}
              />
              <FormLabel htmlFor="force-theme" ml="3">
                {isForceThemeBackground ? 'Yes' : 'No'}
              </FormLabel>
            </FormControl>
          </label>

          {/* 铁幕重重困青年 */}
          <label>
            铁幕重重困青年
            <FormControl display="flex" alignItems="center">
              <Switch id="gwf" isChecked={isGWF} onChange={setIsGWF.toggle} />
              <FormLabel htmlFor="gwf" ml="3">
                {isGWF ? 'Fuck' : 'No thank you!'}
              </FormLabel>
            </FormControl>
          </label>

          {/* 三个按钮 */}
          <Stack direction="row" spacing={4} align="center" marginTop="3">
            <Button colorScheme="purple" isDisabled borderRadius="20">
              Apply
            </Button>
            <Button colorScheme="orange" isDisabled borderRadius="20">
              closed
            </Button>
            <Button
              colorScheme="red"
              borderRadius="20"
              onClick={() => {
                dispatch({
                  type: 'reset',
                  payload: { theme: 'shadesOfPurple', font: 'Fira Code', fontSize: 16 },
                })
              }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
      </div>
    ),
    [
      dispatch,
      isFontChanges,
      isForceThemeBackground,
      isGWF,
      isThemeChanges,
      setIsFontChanges.toggle,
      setIsForceThemeBackground.toggle,
      setIsGWF.toggle,
      setIsThemeChanges.toggle,
      state.font,
      state.fontSize,
      state.theme,
    ]
  )
}

export default Setting
