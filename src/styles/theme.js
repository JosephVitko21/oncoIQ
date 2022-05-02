import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    primary: "#a876ca",
    light: "#f6ecfa",
    secondary: "#db7eab"
  },
})

export default theme