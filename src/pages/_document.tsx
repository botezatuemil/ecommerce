import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
      <body className='min-h-[100%] relative'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
