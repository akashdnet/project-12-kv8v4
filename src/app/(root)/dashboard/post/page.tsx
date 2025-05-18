
import PostsClient from "./PostsClient";

export default async function PostsPage() {
  return (
    <div className="flex flex-col gap-9">
      <div className="mt-2 text-4xl text-center font-bold">Post Manager</div>     
      <PostsClient />
    </div>
  );
}



