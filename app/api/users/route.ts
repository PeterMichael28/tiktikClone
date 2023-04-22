import { allUsersQuery } from '@/utils/utils/queries';
import { client } from '@/utils/utils/client';
import { NextResponse } from 'next/server';

export async function GET( request: Request ) {
    const query = allUsersQuery()

    const data = await client.fetch(query)

    if ( data ) {
        return NextResponse.json(data)
    } else {
        return NextResponse.json([])
    }
}
  