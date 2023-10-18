/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
interface ImportMetaEnv {
  readonly;
  VITE_APP_TITLE: string;
  VITE_API_URL: string;
  VITE_SOME_KEY: number;
  VITE_Socket_URL: string | null;
  // more env variables...
}
