declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: string
    readonly NEXT_PUBLIC_VERSION: string
    readonly NEXT_PUBLIC_LOCALE: string
  }
}
