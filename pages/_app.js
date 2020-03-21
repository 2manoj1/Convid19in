import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/mui/theme';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
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
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}