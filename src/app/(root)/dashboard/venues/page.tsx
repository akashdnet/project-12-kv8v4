import VenueClient from "./VenueClient";


export default async function PostsPage() {
  return (
    <div className="flex flex-col gap-9 w-full">
      <div className="mt-2 text-4xl text-center font-bold">Venue Manager</div>     
      <VenueClient />
    </div>
  );
}
