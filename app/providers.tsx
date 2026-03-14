'use client'

import { ChakraProvider, createSystem, defaultSystem, defineConfig } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

// 1. Define your custom configuration
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        momentum: {
          'primary-purple': { value: '#A78BFA' },
          'primary-purple-light': { value: '#C4B5FD' },
          'midnight-indigo': { value: '#1E1B4B' },
          'bg-main': { value: '#F8F7FF' },
          'bg-soft': { value: '#F5F3FF' },
          'bg-card': { value: '#FFFFFF' },
          'gray-primary': { value: '#C9C9CF' },
          'gray-secondary': { value: '#F2F2F3' },
          'gray-darker': { value: '#E4E4E7' },
          'black': { value: '#000000' },
          'black-64': { value: 'rgba(0, 0, 0, 0.64)' },
          'black-48': { value: 'rgba(0, 0, 0, 0.48)' },
          // Add others here as needed using the { value: 'hex' } format
        }
      }
    }
  }
})

// 2. Create the system
const system = createSystem(defaultSystem, config)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Note: value={system} tells Chakra to use your colors
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </ChakraProvider>
  )
}