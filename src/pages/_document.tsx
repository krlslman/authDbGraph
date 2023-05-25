import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd/dist/antd.min.css" />
          <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet"/>      
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
  )
}
