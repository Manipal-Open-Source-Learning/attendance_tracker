/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEBSITE_NAME: string;
  readonly VITE_FRONTEND_URL: string;
  readonly VITE_DEFAULT_DESCRIPTION: string;
  readonly VITE_DEFAULT_OG_IMAGE: string;
  readonly VITE_TWITTER_HANDLE: string;
  readonly VITE_THEME_COLOR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}