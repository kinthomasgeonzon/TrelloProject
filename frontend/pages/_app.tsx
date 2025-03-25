import { store } from "@/app/store/store";
import "bulma/css/bulma.min.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
