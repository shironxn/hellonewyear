import { CreateWishModal, GetWishModal } from "@/components/wish";
import { getWishes } from "./actions";
import { Countdown } from "@/components/countdown";

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
    <div className="container flex flex-col items-center m-auto gap-8 font-poppins">
      <div className="flex justify-center flex-col gap-8 w-full">
        <div className="flex flex-col items-center justify-center gap-2 text-4xl md:text-6xl font-medium mb-4 text-center">
          <span>
            New Year Countdown {new Date().getFullYear() + 1}
          </span>
        </div>
        <Countdown />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <CreateWishModal />
        {wishes && <GetWishModal wishes={wishes} />}
      </div>
    </div>
  );
}
