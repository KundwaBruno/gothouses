import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

type Props = null;

class Document extends NextDocument<Props> {
  render = (): JSX.Element => {
    return (
      <Html>
        <Head>
          <link rel='icon' href='/images/logo.png' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Cinzel:wght@500&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}

export default Document;
