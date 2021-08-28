import React, { useMemo } from 'react'
import { Box, Flex } from '@chakra-ui/react'

/**
 * @see https://github.com/typescript-cheatsheets/react#useful-react-prop-type-examples
 */
interface ISidebarProps {
  /**
   * @description sidebar content on the left
   */
  left: () => React.ReactNode
  /**
   * @description main content on the right
   */
  right: () => React.ReactNode
}

export const Sidebar: React.FC<ISidebarProps> = (props) => {
  const { left, right } = props

  return useMemo(
    () => (
      <Flex
        sx={{
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            p: 3,
            flexGrow: 1,
            flexBasis: 256,
          }}
        >
          {left()}
        </Box>
        <Box
          sx={{
            p: 3,
            flexGrow: 9999,
            flexBasis: 0,
            minWidth: 320,
          }}
        >
          {right()}
        </Box>
      </Flex>
    ),
    [left, right]
  )
}

export default Sidebar
