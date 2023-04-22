
import { client } from '@/utils/utils/client';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { NextResponse } from 'next/server';


interface User {
    _id: string;
    picture: string;
    userName: string;
    image: string
}

export async function POST( request: Request ) {
    const res = await request.json();
    // console.log(res)

   const data = await client.createIfNotExists<Record<string, any>>(res)

   
    return NextResponse.json('Login Successful!!!')
}
  

  