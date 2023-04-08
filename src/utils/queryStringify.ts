export function queryStringify(data: Record<string, string>): string {
  return (
    '?' +
    Object.entries(data)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
}
