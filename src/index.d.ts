declare module "empty-promise" {
  export interface EmptyPromise<T = any> extends Promise<T> {
    resolve(t?: T): Promise<T>;
    reject(e: any): Promise<T>;
    done(): boolean;
  }
  export default function emptyPromise<T>(): EmptyPromise<T>;
}
