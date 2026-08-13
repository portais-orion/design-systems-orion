export function normalizeBasePath(value?: string) {
  if (!value || value === "/") return "";

  const normalized = `/${value.replace(/^\/+|\/+$/g, "")}`;
  return normalized === "/" ? "" : normalized;
}

export function withBasePathValue(pathname: string, value: string) {
  const normalized = normalizeBasePath(value);
  if (!normalized || !pathname.startsWith("/") || pathname.startsWith(`${normalized}/`) || pathname === normalized) {
    return pathname;
  }

  return `${normalized}${pathname}`;
}

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(pathname: string) {
  return withBasePathValue(pathname, basePath);
}
