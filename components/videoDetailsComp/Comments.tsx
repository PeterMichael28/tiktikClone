import { useState, useEffect, Key } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { Video } from "@/types";
import NoResults from "../NoResults";
import useAuthStore from "@/store/authStore";
import axios from "axios";
import { base_url } from "@/app/layout";
import { v4 as uuidv4 } from "uuid";
import CommentSection from "@/components/videoDetailsComp/CommentSection";


interface IProps {
 post: Video;
}

interface IComments {
 comment: string;
 _key: string;
 postedBy: {
  _ref: string;
  _id: string;
  userName: string;
  image: string;
 };
 userName: string;
 image: string;
}

const Comments = ({ post }: IProps) => {
 const [comment, setComment] = useState<string>("");
 const [posts, setPosts] = useState<any>(post);
 const [comments, setComments] = useState<any>([]);
 const [isPosting, setIsPosting] = useState(false);

 const [isSSR, setIsSSR] = useState(true);
 useEffect(() => {
  setIsSSR(false);

  if (posts.comments) {
   setComments(posts?.comments);
  } else {
   setComments([]);
  }
 }, [posts]);

 //  console.log(post)

 const { userProfile }: any = useAuthStore();

 const addComment = async (e: React.SyntheticEvent) => {
  e.preventDefault();

  let commentKey = uuidv4();

  if (userProfile && comment) {
   setIsPosting(true);
   const res: { data: Video } = await axios.put(
    `${base_url}/api/post/${post._id}`,
    {
     user: userProfile,
     comment,
     _key: commentKey,
     status: "addingComment",
    }
   );

   if (
    res?.data?.comments &&
    res?.data?.comments?.length > 0
   ) {
    setPosts({
     ...posts,
     comments: [
      ...posts.comments,
      res.data?.comments[res.data?.comments.length - 1],
     ],
    });
   } else {
    setPosts({
     ...posts,
     comments: [...res?.data?.comments],
    });
   }

   setComment("");
   setIsPosting(false);
  }
 };

 const delComment = async (key: string) => {
  const res: { data: Video } = await axios.put(
   `${base_url}/api/post/${post._id}`,
   {
    _key: key,
    status: "deletingComment",
   }
  );

  console.log(res?.data?.comments);

  if (res?.data?.comments?.length > 0) {
   setPosts({
    ...posts,
    comments: [...res?.data?.comments],
   });
  } else {
   setPosts({
    ...posts,
    comments: [],
   });
  }
 };

 return (
  <>
   {!isSSR && (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[20px] mt-1 mb-2">
     <div className="overflow-scroll h-[400px] ">
      {comments && comments?.length > 0 ? (
       //  <CommentSection comments={comments} />
       <div>
        {comments?.map(
         (
          comment: IComments,
          i: Key | null | undefined
         ) => (
          <div
           className="md:p-2 py-2 px-1 space-y-1"
           key={i}
          >
           <Link
            href={`/profile/${comment?.postedBy?._id}`}
            className="flex items-center gap-1"
           >
            <div className="w-6 h-6">
             <Image
              alt="user-profile"
              src={
               comment?.postedBy?.image || comment?.image
              }
              width={34}
              height={34}
              className="rounded-full"
             />
            </div>

            <div className="">
             <p className="flex gap-1 items-center text-xs md:text-sm font-bold text-black/50 lowercase">
              <span>
               {(comment?.postedBy?._id ||
                comment?.postedBy?._ref) === userProfile._id
                ? "You"
                : comment?.postedBy?.userName ||
                  comment?.userName}
               {/* {comment?.postedBy?.userName || comment?.userName} */}
              </span>
              <GoVerified className="text-blue-400" />
             </p>
            </div>
           </Link>
           <div className="flex justify-between items-center w-full">
            <p className="text-sm">{comment?.comment}</p>
            <AiFillDelete
             className="cursor-pointer hover:scale-90 w-5 h-5"
             onClick={() =>
              delComment(comment._key)
              
             }
            />
           </div>
          </div>
         )
        )}
       </div>
      ) : (
       // <div>Comments </div>
       // <div>Comments </div>
       <NoResults text="No comments yet!!! Be the first to comment" />
      )}
     </div>

     {userProfile && (
      <div className="absolute -bottom-5 left-0 pb-2 px-2 md:px-5 mt-3 w-full bg-white">
       <form className="flex gap-4" onSubmit={addComment}>
        <input
         type="text"
         value={comment}
         onChange={(e) => {
          setComment(e.target.value);
         }}
         required
         placeholder="Add Comment..."
         className="bg-[#f8f8f8] px-4 py-3 text-md font-medium border-2 w-full border-gray focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg placeholder::text-xs placeholder::text-gray-300"
        />

        <button className="text-md bg-[#f51997] px-4 py-3 hover:bg-transparent hover:border hover:border-[#f51997] hover:text-[#f51997] text-white transition-all duration-300 rounded-md font-semibold text-md">
         {isPosting ? "Commenting..." : "Comment"}
        </button>
       </form>
      </div>
     )}
    </div>
   )}
  </>
 );
};

export default Comments;
