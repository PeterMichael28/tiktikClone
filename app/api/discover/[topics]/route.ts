import { client } from "@/utils/utils/client";
import { topicPostsQuery } from "@/utils/utils/queries";
import { NextResponse } from "next/server";

export async function GET(
 request: Request,
 {
  params,
 }: {
  params: { topics: string };
 }
) {
 const topics = params.topics;
 const query = topicPostsQuery(topics);

 const data = await client.fetch(query);
 return NextResponse.json(data);
}