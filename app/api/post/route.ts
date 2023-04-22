import { allPostsQuery } from '@/utils/utils/queries';
import { client } from '@/utils/utils/client';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    const query = allPostsQuery()

    const data = await client.fetch(query)
    return NextResponse.json(data)
}
  
export async function POST( request: Request ) {
    const res = await request.json();
   

    await client.create(res)
    return NextResponse.json('posted successfully')
}
  
