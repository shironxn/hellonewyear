import { Countdown } from "@/components/countdown";
import { CreateWishModal, GetWishModal } from "@/components/wish";
import { getWishes } from "./actions";

export default async function Home() {
  const data = await getWishes();

  const wishes: { id: string; message: string; timestamp: number }[] = [];
  data.forEach((item) => {
    wishes.push({
      id: item.key,
      ...item.val(),
    });
  });

  return (
    <div className="container flex flex-col items-center m-auto gap-8">
      <div className="flex justify-center flex-col gap-8">
        <h1 className="text-5xl font-bold mb-4 text-center">
          New Year Countdown {new Date().getFullYear() + 1}
        </h1>
        <Countdown />
      </div>
      <div className="flex gap-2">
        <CreateWishModal />
        {wishes && <GetWishModal wishes={wishes} />}
      </div>
    </div>
  );
}
