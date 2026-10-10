// Minimale Typen für node:sqlite (nur in der D1-Attrappe der Worker-Tests benutzt; @types/node ist nicht installiert)
declare module 'node:sqlite' {
  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): {
      get(...params: unknown[]): unknown;
      all(...params: unknown[]): unknown[];
      run(...params: unknown[]): { lastInsertRowid: number | bigint; changes: number | bigint };
    };
  }
}
