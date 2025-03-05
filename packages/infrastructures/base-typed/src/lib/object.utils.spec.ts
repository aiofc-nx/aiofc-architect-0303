// apps/fastify-mvc/src/app/utils.spec.ts
import { PropType, NestedKeyOf, RecordNamePaths } from './object.utils';

type Example = {
  a: {
    b: {
      c: string;
    };
  };
  d: number;
};

describe('Utility Types', () => {
  it('should extract the correct property type using PropType', () => {
    type Result1 = PropType<Example, 'a.b.c'>; // Result1 应为 string
    type Result2 = PropType<Example, 'd'>; // Result2 应为 number
    type Result3 = PropType<Example, 'a.b.d'>; // Result3 应为 unknown

    const test1: Result1 = 'Hello'; // 应该通过
    const test2: Result2 = 42; // 应该通过
    const test3: Result3 = 'Not allowed'; // 应该报错

    expect(test1).toBe('Hello');
    expect(test2).toBe(42);
  });

  it('should generate nested keys using NestedKeyOf', () => {
    type Result = NestedKeyOf<Example>;
    // Result 应为 'a' | 'a.b' | 'a.b.c' | 'd'
    const keys: Result[] = ['a', 'a.b', 'a.b.c', 'd']; // 应该通过

    expect(keys).toContain('a');
    expect(keys).toContain('a.b');
    expect(keys).toContain('a.b.c');
    expect(keys).toContain('d');
  });

  it('should generate record of name paths using RecordNamePaths', () => {
    type Result = RecordNamePaths<Example>;
    const record: Result = {
      a: { b: { c: 'Hello' } },
      'a.b': { c: 'Hello' },
      'a.b.c': 'Hello',
      d: 42,
    }; // 应该通过

    expect(record['a'].b.c).toBe('Hello');
    expect(record['d']).toBe(42);
  });
});
