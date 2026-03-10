//#region src/types/helper.d.ts
type Prettify<T> = Omit<T, never>;
type PrettifyDeep<T> = { [K in keyof T]: T[K] extends ((...args: any[]) => any) ? T[K] : T[K] extends object ? T[K] extends Array<any> ? T[K] : T[K] extends Date ? T[K] : PrettifyDeep<T[K]> : T[K] } & {};
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type RequiredKeysOf<BaseType extends object> = Exclude<{ [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? Key : never }[keyof BaseType], undefined>;
type HasRequiredKeys<BaseType> = 0 extends 1 & BaseType ? false : [BaseType] extends [object] ? RequiredKeysOf<BaseType & object> extends never ? false : true : false;
type StripEmptyObjects<T extends object> = { [K in keyof T]: T[K] };
//#endregion
export { HasRequiredKeys, Prettify, PrettifyDeep, RequiredKeysOf, StripEmptyObjects, UnionToIntersection };
//# sourceMappingURL=helper.d.mts.map