export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Set) {
    return new Set(Array.from(obj)) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as T;
  }

  const copy = {} as T;
  Object.keys(obj as object).forEach((key) => {
    copy[key as keyof T] = deepCopy((obj as any)[key]);
  });

  return copy;
}
