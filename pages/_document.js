import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/mui/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
        <meta name="description" content="Details of COVID-19 outbreak in India (Data Updated from Govt. Source)" />
          <meta name="keywords" content="COVID-19, COVID, coronavirus, virus 2020, India Covid19, Govt. Data, Novel Corona Virus" />
          <meta name="author" content="Manoj Mukherjee" />
          <meta property="og:type" content="website" />
          <meta name="og:title" property="og:title" content="COVID-19 in India" />
          <meta name="og:description" property="og:description" content="Corona Virus outbreak in India details data" />
          <meta property="og:site_name" content="covid19in" />
          <meta property="og:url" content="https://covid19in.now.sh" />
          <meta name="twitter:card" content="covid19" />
          <meta name="twitter:title" content="covid19 India" />
          <meta name="twitter:description" content="covid19 India deails data" />
          <meta name="twitter:site" content="@MoHFW_INDIA" />
          <meta name="twitter:creator" content="ManojMukherje19" />
          <title>COVID-19 India Data</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

          <meta name="mobile-web-app-capable" content="yes" />

          <meta name="apple-mobile-web-app-title" content="Application Title" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="msapplication-navbutton-color" content="red" />
          <meta name="msapplication-TileColor" content="red" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          <meta name="application-name" content="Application Name" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          <meta name="nightmode" content="enable/disable" />
          <meta name="layoutmode" content="fitscreen/standard" />
          <meta name="imagemode" content="force" />
          <meta name="screen-orientation" content="portrait" />
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};