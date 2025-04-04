/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_DOMAIN: string;
  readonly VITE_ACCESS_TOKEN_EXPIRES: string;
  readonly VITE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
