/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

declare module 'vite/client' {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
