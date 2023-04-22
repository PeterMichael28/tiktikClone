import { client } from "@/utils/utils/client";
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from "@/utils/utils/queries";
import { NextResponse } from "next/server";


export async function GET( request: Request, {
    params,
   }: {
    params: { id: string };
   } ) {
    

    const userQuery = singleUserQuery(params.id)
    const userPostQuery = userCreatedPostsQuery(params.id)
    const userLikedQuery = userLikedPostsQuery(params.id)

    const user = await client.fetch(userQuery)
    const userVideos = await client.fetch(userPostQuery)
    const userLikedVideos = await client.fetch(userLikedQuery)

    return NextResponse.json({user: user[0], userVideos, userLikedVideos})

}