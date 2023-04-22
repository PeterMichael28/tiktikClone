import { client } from "@/utils/utils/client";
import { searchPostsQuery,  } from "@/utils/utils/queries";
import { NextResponse } from "next/server";


export async function GET( request: Request, { params }: { params: { search: string; }; } ) {
    
    const search = params.search;

    const query = searchPostsQuery( search )
    
    const res = await client.fetch( query );
    
    return NextResponse.json(res)

}