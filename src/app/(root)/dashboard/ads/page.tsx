import AdClient from "./AdClient";

export default async function PostsPage() {
  return (
    <div className="flex flex-col gap-9 w-full">
      <div className="mt-2 text-4xl text-center font-bold">Ads Manager</div>
      <AdClient />
    </div>
  );
}
