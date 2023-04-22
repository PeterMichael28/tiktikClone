import { client } from "@/utils/utils/client";
import { postDetailQuery } from "@/utils/utils/queries";
import { NextResponse } from "next/server";

export async function GET(
 request: Request,
 {
  params,
 }: {
  params: { id: string };
 }
) {
 const id = params.id;
 const query = postDetailQuery(id);

 const data = await client.fetch(query);
 return NextResponse.json(data);
}

export async function PUT(
 request: Request,
 {
  params,
 }: {
  params: { id: string };
 }
) {
 const { user, comment, _key, status } = await request.json();

  let data;
  if ( status === 'addComment' ) {
   data = await client
  .patch(params.id)
  .setIfMissing({ comments: [] })
  .insert("after", "comments[-1]", [
   {
    comment,
    _key,
    postedBy: {
     _type: "postedBy",
     _ref: user._id
    },
    userName: user.userName,
     image: user.image,
   },
  ])
  .commit();
  } else {
  data = await client
  .patch(params.id)
  .unset([`comments[_key =="${_key}"]`])
  .commit();
 }


 return NextResponse.json(data);
}
