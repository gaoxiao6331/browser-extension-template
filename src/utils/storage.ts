export interface Storage {
  write(data: unknown): void;
  read(): unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class LocalStorage<T extends Record<string, any>> implements Storage {
  constructor(private key: string) {}

  write(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  read(): T | null {
    const res = localStorage.getItem(this.key);
    if (res !== null) {
      return JSON.parse(res);
    }
    return null;
  }
}
