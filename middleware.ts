export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/issues", "/api/issues/:id+"],
};
