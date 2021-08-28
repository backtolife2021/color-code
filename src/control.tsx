import React from 'react'
import { Box, Select, VStack } from '@chakra-ui/react'

interface I<T> {
  value: T
}

export const Control: React.FC = (props) => {
  return (
    <VStack>
      <Box>
        <Select />
      </Box>
    </VStack>
  )
}

export default Control
