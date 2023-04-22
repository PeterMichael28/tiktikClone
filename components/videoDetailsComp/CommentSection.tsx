import useAuthStore from "@/store/authStore";
import { IUser } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { useRouter } from "next/navigation";

interface IComments {
 comment: string;
 _key: string;
 postedBy: {
  _ref: string;
  _id: string;
 };
 userName: string;
 image: string;
}

const CommentSection = ({
 comments,
}: {
 comments: IComments[];
}) => {
 const { userProfile, allUsers }: any = useAuthStore();

 //  const router = useRouter();

 return (
  <div>
   {comments?.map((comment: IComments, i) => (
    <div
     className="p-2 items-center border border-red-300"
     key={i}
    >
     <div
      className="flex items-start gap-3"
      //   onClick={() =>
      //    router.push(`/profile/${comment?.postedBy?._id}`)
      //   }
     >
      {/* <div className="w-8 h-8">
       <Image
        alt="user-profile"
        src={comment?.image}
        width={34}
        height={34}
        className="rounded-full"
       />
      </div> */}

      <div className="hidden lg:block ">
       <p className="flex gap-1 items-center text-md font-bold text-black/70 lowercase">
        {comment?.userName}
        <GoVerified className="text-blue-400" />
       </p>

       <p className="capitalize text-gray-400 text-xs">
        {comment?.userName}
       </p>
      </div>
     </div>
     <div>
      <p>{comment?.comment}</p>
     </div>
    </div>
   ))}
  </div>
 );
};

export default CommentSection;

// {allUsers?.map((user: IUser) => {
//     (user._id === comment.postedBy._id) ? (
//  <div className="p-2 items-center border border-red-300" key={i}>
//   <Link href={`/profile/${user._id}`} >
//    <div className="flex items-start gap-3">
//     <div className="w-8 h-8">
//      <Image
//       alt="user-profile"
//       src={user.image}
//       width={34}
//       height={34}
//       className="rounded-full"
//      />
//     </div>

//     <div className="hidden lg:block ">
//      <p className="flex gap-1 items-center text-md font-bold text-black/70 lowercase">
//       {user.userName.replace(" ", "")}{" "}
//       <GoVerified className="text-blue-400" />
//      </p>

//      <p className="capitalize text-gray-400 text-xs">
//       {user.userName}
//      </p>
//     </div>
//    </div>
//   </Link>

//   <div>
//    <p>{comment.comment}</p>
//   </div>

//     </div>

//     ) :
//     <div>No match</div>
//    })}
