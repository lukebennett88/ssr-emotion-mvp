import "../styles/global.css";
import type { AppProps } from "next/app";
import { EmotionCacheProvider } from "../emotion-cache-provider";

function App({ Component, pageProps }: AppProps) {
  return (
    <EmotionCacheProvider>
      <Component {...pageProps} />
    </EmotionCacheProvider>
  );
}

export default App;
