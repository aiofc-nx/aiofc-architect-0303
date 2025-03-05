/**
 * 获取对象中指定路径的属性类型
 * PropType<T, Path extends string> 是一个 TypeScript 的条件类型，用于根据给定的对象类型 T 和路径字符串 Path 提取对应的属性的类型。
 * 作用：
 * 提取属性类型：
 * 根据给定的路径字符串 Path，从对象类型 T 中提取对应的属性的类型。
 * 支持嵌套路径：
 * 该类型支持嵌套路径，例如 a.b.c，可以递归查找对象 T 中的嵌套属性。
 * 处理不存在的路径：
 * 如果路径中的某个键不存在于对象 T 中，返回 unknown，以避免类型错误。
 * @template T - 需要处理的对象
 * @template Path - 需要提取的属性的路径
 * @returns 返回指定路径的属性的类型，如果路径指定的属性不存在，则返回unknown
 */
export type PropType<T, Path extends string> = string extends Path
  ? unknown
  : Path extends keyof T
    ? T[Path]
    : Path extends `${infer K}.${infer R}`
      ? K extends keyof T
        ? PropType<T[K], R>
        : unknown
      : unknown;

/**
 * 获取对象的嵌套键的字符串表示
 * NestedKeyOf<ObjectType extends object> 是一个 TypeScript 的条件类型，用于生成给定对象类型的所有嵌套键路径。下面是对这个类型的详细解释：
 * 作用：
 * 生成嵌套键路径：
 * 该类型可以遍历对象的每个键，并生成一个字符串字面量联合类型，表示对象中所有可能的嵌套路径。
 * 支持嵌套对象：
 * 如果对象的某个键对应的值是一个对象，则递归调用 NestedKeyOf 以获取其嵌套键路径。
 * @template ObjectType - 对象类型
 * @returns 返回对象中所有嵌套键的路径字符串
 */
export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

/**
 * 获取对象中所有属性路径及其对应的属性类型
 * RecordNamePaths<T extends object> 是一个 TypeScript 的条件类型，用于生成一个对象类型，其中每个键都是给定对象的嵌套路径，值是对应路径的属性类型。下面是对这个类型的详细解释：
 * 作用：
 * 生成嵌套路径记录：
 * 该类型可以遍历对象的所有嵌套路径，并为每个路径生成一个键值对，键是路径，值是该路径对应的属性类型。
 * 增强类型安全性：
 * 通过将路径与其对应的类型关联，可以在使用这些路径时获得更好的类型检查和自动补全。
 * @template T - 对象类型
 * @returns 返回一个映射，键为属性路径，值为对应的属性类型
 */
export type RecordNamePaths<T extends object> = {
  [K in NestedKeyOf<T>]: PropType<T, K>;
};
