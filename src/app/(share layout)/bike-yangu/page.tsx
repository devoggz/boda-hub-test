import UserPostCard from "@/components/UserPostCard";
import { getUserPosts } from "../../../../actions/getUserPosts";
import ContentCard from "@/components/ContentCard";

export default async function BikeNews() {
  const userposts = await getUserPosts("bikeyangu"); // Filter by "Bike" category

  return (
    <div className="container mx-auto p-6 mb-8 ">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-tl-xl rounded-tr-xl p-6 mb-4 text-center font-bold text-2xl text-white">
        {" "}
        Yaani Bike Yangu Inanibamba
        <p className="text-sm text-white font-normal">
          Kwa nini wanaboda wanasifu bike zao
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 ">
        <div className="lg:col-span-12 col-span-1">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
            {userposts.map((userPost, index) => (
              <ContentCard
                key={index}
                videoURL={userPost.videoURL}
                category={userPost.category}
                title={userPost.title}
                thumbnailURL={userPost.thumbnailURL}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
