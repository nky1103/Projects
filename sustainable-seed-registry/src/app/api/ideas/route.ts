import { NextResponse } from "next/server";
import { createIdea, listIdeas, IdeaInput } from "@/lib/ideas";
import { seedIfEmpty } from "@/lib/seed";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  seedIfEmpty();
  const { searchParams } = new URL(request.url);
  const ideas = listIdeas({
    sector: searchParams.get("sector") ?? undefined,
    stage: searchParams.get("stage") ?? undefined,
    q: searchParams.get("q") ?? undefined,
  });
  return NextResponse.json({ ideas });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = IdeaInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const idea = createIdea(parsed.data);
  return NextResponse.json({ idea }, { status: 201 });
}
