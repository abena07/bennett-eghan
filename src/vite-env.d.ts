/// <reference types="vite/client" />

declare module "swiper/css" {}

interface ImportMetaEnv {
  readonly VITE_PUBLR_USER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}