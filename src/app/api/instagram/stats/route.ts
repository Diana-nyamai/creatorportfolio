import { getInstagramStats } from "@/lib/instagram";

export async function GET() {
  return Response.json(await getInstagramStats(), { headers: { "Cache-Control": "no-store" } });
}
