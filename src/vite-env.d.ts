// <reference types="vite/client" />
declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
interface ImportMeta {
  env: Record<string, unknown>;
}
