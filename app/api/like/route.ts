
import { client } from '@/utils/utils/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PUT( request: Request ) {
    const {userId, postId, like} = await request.json();

    const data = like ? await client
        .patch( postId )
        .setIfMissing( { likes: [] } )
        .insert( 'after', 'likes[-1]', [
            {
                _key: uuidv4(),
                _ref: userId
            }
        ] ).commit()
        : await client.patch( postId ).unset([`likes[_ref == "${userId}"]`]).commit()
    return NextResponse.json(data)
}
  
