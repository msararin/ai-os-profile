import { NextResponse } from "next/server"
import { existsSync } from "fs"

const DB_PATH = process.env.DATABASE_PATH

export async function GET() {
  try {
    return NextResponse.json({
      status: DB_PATH && existsSync(DB_PATH) ? "configured" : "not_connected",
      surface: "public_safe_health",
      telemetry: "internal_only",
      message:
        "Observability public endpoint is limited to safe health status. Detailed telemetry stays behind internal review workflows.",
    })
  } catch (error) {
    console.error("Observability API error:", error)
    return NextResponse.json(
      {
        status: "error",
        surface: "public_safe_health",
        message: "Observability status is unavailable.",
      },
      { status: 500 }
    )
  }
}
