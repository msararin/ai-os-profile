import { accessDenied } from "@/lib/access-denied"
export function GET() { return accessDenied() }
