// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps};
  }
  render() {
    return (
      <Html lang="tr">
        <Head>
        <link rel="preload" href="/static/css/bootstrap.css" as="style" />
        <link rel="preload" href="/static/favicon/manifest.json"  as="manifest"/>
        
        <link rel="apple-touch-icon" sizes="57x57" href="/static/favicon/apple-icon-57x57.png" />
              <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon/apple-icon-60x60.png" />
              <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon/apple-icon-72x72.png" />
              <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon/apple-icon-76x76.png" />
              <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon/apple-icon-114x114.png" />
              <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon/apple-icon-120x120.png" />
              <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon/apple-icon-144x144.png" />
              <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon/apple-icon-152x152.png" />
              <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-icon-180x180.png" />
              <link rel="icon" type="image/png" sizes="192x192" href="/static/favicon/android-icon-192x192.png" />
              <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
              <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon/favicon-96x96.png" />
              <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
              
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="msapplication-TileImage" content="/static/favicon/ms-icon-144x144.png" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="title" content="Next Js Merhaba" />
                    <meta name="author" content="Halit Akbulut" />
                    <meta name="owner" content="VHalit" />
                    <meta name="copyright" content="(c) 2019" />
                    <meta name="description" content="Nextjs kullanımı,React,redux,realtime database kullanımı,firebase hosting,Scss kullanımı,nosql örneği,redux-persis örnek"/>
                    <meta name="keywords" content="databaseyapim,misafir,aŞamasiyapilacakla,yaprealtime,giriş,firebase,next" />
                    <meta name="robots" content="noindex,nofollow"/>
                  
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;