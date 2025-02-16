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

export function absoluteUrl(input = '') {
  return process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}${input}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${input}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}${input}`;
}
