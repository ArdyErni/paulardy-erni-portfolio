import { handleContact } from "@/lib/server/contact";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleContact(request);
}
