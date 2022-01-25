import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import * as React from "react";

const sparkWebCache = createCache({
  key: "spark-web-cache",
});

type EmotionCacheProviderProps = {
  children: React.ReactNode;
};

export function EmotionCacheProvider({
  children,
}: EmotionCacheProviderProps): JSX.Element {
  return <CacheProvider value={sparkWebCache}>{children}</CacheProvider>;
}
