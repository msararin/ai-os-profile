import "next-auth"
declare module "next-auth" { interface Session { googleSub?: string; ownerExpiresAt?: number; valid?: boolean } }
