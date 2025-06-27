declare module "classnames" {
  type ClassValue =
    | string
    | number
    | ClassDictionary
    | ClassArray
    | undefined
    | null
    | boolean;
  interface ClassDictionary {
    [id: string]: any;
  }
  interface ClassArray extends Array<ClassValue> {}
  function classNames(...classes: ClassValue[]): string;
  export = classNames;
}
