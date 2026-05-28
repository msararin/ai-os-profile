declare module "better-sqlite3" {
  export interface DatabaseOptions {
    readonly?: boolean
    fileMustExist?: boolean
    timeout?: number
    verbose?: (message?: unknown, ...additionalArgs: unknown[]) => void
  }

  export interface Statement {
    all(...params: unknown[]): unknown[]
  }

  export default class Database {
    constructor(filename: string, options?: DatabaseOptions)
    prepare(source: string): Statement
    close(): void
  }
}
