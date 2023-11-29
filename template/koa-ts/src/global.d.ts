declare type Controller = (...args: any[]) => Promise<unknown>

declare interface Route {
    name?: string
    path: string | RegExp
    method?: string | string[]
    controller: Controller | Controller[]
}

declare var __APP__: string
declare var __MODE__: string
declare var __DEBUG__: boolean
declare var __PORT__: number