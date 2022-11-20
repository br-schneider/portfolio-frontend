import { useEffect, useRef } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import PlausibleProvider from 'next-plausible'
import '@/styles/tailwind.css'
import 'focus-visible'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const queryClient = new QueryClient()

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  //get the url
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const isProd = url.includes('brettcschneider.com')

  return (
    <QueryClientProvider client={queryClient}>
      <PlausibleProvider enabled={isProd} domain="brettcschneider.com">
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative">
          <Header />
          <main>
            <Component previousPathname={previousPathname} {...pageProps} />
          </main>
          <Footer />
        </div>
      </PlausibleProvider>
    </QueryClientProvider>
  )
}
