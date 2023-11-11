export { default } from "next-auth/middleware"

export const config = { 
  matcher: ["/profile/(.*)/edit", "/sell/create", "/cart"],
}