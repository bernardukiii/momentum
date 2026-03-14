'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React from 'react'

// 1. Define the custom theme configuration
const theme = extendTheme({
  colors: {
    momentum: {
      'pink-primary': '#FBB6CE',
      'rare-green': '#68D391',
      'light-green': '#9AE6B4',
      'green': '#68D391',
      'blue-primary': '#00B5D8',
      'blue-secondary': '#90CDF4',
      'blue-darker': '#007D9C',
      'purple-primary': '#D6BCFA',
      'turquoise': '#89D2DC',
      'gray-primary': '#C9C9CF',
      'gray-secondary': '#F2F2F3',
      'gray-darker': '#E4E4E7',
      'black': '#000000',
      'black-8': 'rgba(0, 0, 0, 0.08)',
      'black-70': 'rgba(0, 0, 0, 0.70)',
      'black-64': 'rgba(0, 0, 0, 0.64)',
      'black-48': 'rgba(0, 0, 0, 0.48)',
      'black-16': 'rgba(0, 0, 0, 0.16)',
      
      // === CORE BRAND ===
      'bdki-primary-purple-light': '#C4B5FD',
      'bdki-primary-purple': '#A78BFA',
      'bdki-midnight-indigo': '#1E1B4B',
      'bdki-primary-indigo-hover': '#6366F1',
      'bdki-primary-indigo-active': '#4F46E5',

      // === ACCENT ===
      'bdki-accent-lavender': '#DDD6FE',
      'bdki-accent-soft': '#EDE9FE',

      // === BACKGROUNDS ===
      'bdki-bg-main': '#F8F7FF',
      'bdki-bg-soft': '#F5F3FF',
      'bdki-bg-card': '#FFFFFF',

      // === TEXT ===
      'bdki-text-primary': '#1F2937',
      'bdki-text-secondary': '#4B5563',
      'bdki-text-muted': '#6B7280',
      'bdki-text-white': '#FFFFFF',

      // === STATES ===
      'bdki-state-success': '#22C55E',
      'bdki-state-warning': '#F59E0B',
      'bdki-state-error': '#EF4444',

      // === BORDERS ===
      'bdki-border-soft': '#E9E7FF',
      'bdki-border-default': '#DDD6FE',
    },
    // Using 500-weight keys is best practice for Chakra components like Checkbox
    bdkiRadioBtn: {
      500: '#A78BFA',
    },
    momentumLoaded: {
      500: '#00B5D8'
    }
  },
})

// 2. Add Type for children prop
interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}