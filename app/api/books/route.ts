import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Get the jobId from the query parameters
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json("jobId is required", { status: 400 });
  }

  const booksUrl = `${process.env.BASE_API_URL!}/results/${jobId}`;

  const res = await fetch(booksUrl);
  const booksData = await res.json();

  return NextResponse.json(booksData, { status: res.status });
}
