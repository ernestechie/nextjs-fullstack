export default function validateRoute({
  routes,
  pathname,
}: {
  routes: string[];
  pathname: string;
}) {
  return routes.some((path) => pathname.startsWith(path));
}
