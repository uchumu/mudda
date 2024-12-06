export type Nullable<T> = T | null;

export interface TObject {
  [key: string]: Nullable<any>;
}

export type PickOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]-?: T[K];
};

export type RemoveOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
