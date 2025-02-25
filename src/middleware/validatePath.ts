export default function validatePath({
  routes,
  pathname,
}: {
  routes: string[];
  pathname: string;
}) {
  return routes.some((path) => pathname.startsWith(path));
}
