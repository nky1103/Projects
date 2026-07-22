import { NextResponse } from "next/server";
import { getIdea } from "@/lib/ideas";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const idea = getIdea(id);
  if (!idea) {
    return NextResponse.json({ error: "Idea not found." }, { status: 404 });
  }
  return NextResponse.json({ idea });
}
