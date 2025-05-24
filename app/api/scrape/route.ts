import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const scrapeUrl = `${process.env.BASE_API_URL!}/scrape`;

  const { theme } = await request.json();

  if (!theme) {
    return NextResponse.json("Theme is required", { status: 400 });
  }

  const res = await fetch(scrapeUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  const data = await res.json();

  console.log("Scrape data:", data);

  return NextResponse.json(data, { status: res.status });
}

export async function GET(): Promise<NextResponse> {
  const scrapeUrl = `${process.env.BASE_API_URL!}/history`;

  const res = await fetch(scrapeUrl);

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");
  const scrapeUrl = `${process.env.BASE_API_URL!}/scrape/${jobId}`;

  const res = await fetch(scrapeUrl, {
    method: "DELETE",
  });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
