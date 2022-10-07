import type { AppProps } from "next/app";
import Head from "next/head";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/globals.css";
import "../styles/keyboard.css";
import { PlaygroundWrapper } from "../Context/PlaygroundContext";
import UserSessionContextWrapper from "../Context/UserSessionContext";
import KeyboardEventHandlersWrapper from "../Context/KeyboardEventHandlersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserSessionContextWrapper>
      <PlaygroundWrapper>
        <KeyboardEventHandlersWrapper>
          <Head>
            <title>Typing Practice - Practice your typing skill</title>
            <link rel="icon" href="/typing.png" />
          </Head>
          <Component {...pageProps} />
        </KeyboardEventHandlersWrapper>
      </PlaygroundWrapper>
    </UserSessionContextWrapper>
  );
}

export default MyApp;
