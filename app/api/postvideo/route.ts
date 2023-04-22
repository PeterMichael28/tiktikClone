
import { client } from '@/utils/utils/client';
import { NextResponse } from 'next/server';


  
export async function POST( request: Request ) {
    const res = await request.json();


    await client.create(res)
    return NextResponse.json('posted successfully')
}
  