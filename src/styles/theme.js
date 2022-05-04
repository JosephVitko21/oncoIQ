import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    primary: "#a876ca",
    secondary: "#db7eab",
    light: "#f6ecfa",
    shadow: "rgb(186 186 186 / 40%)"
  },
})

export default theme