import { Countdown } from "@/components/countdown";
import { CreateWishModal, GetWishModal } from "@/components/wish";
import { WishCounter } from "@/components/wish-counter";
import { getWishes } from "./actions";

export default async function Home() {
  const wishes = await getWishes();
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  return (
    <main className="min-h-screen bg-background text-foreground py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-16 md:gap-20">
        <header className="flex flex-col items-center text-center gap-3 sm:gap-4 w-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            New Year Countdown {nextYear}
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl lg:text-3xl max-w-prose">
            Welcome the new year with gratitude and hope. Share your wishes and
            receive inspiration from others.
          </p>
        </header>

        <section aria-labelledby="countdown-heading" className="w-full">
          <h2 id="countdown-heading" className="sr-only">
            Countdown to New Year {nextYear}
          </h2>
          <Countdown />
        </section>

        <WishCounter />

        <section
          aria-labelledby="wishes-heading"
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl"
        >
          <h2 id="wishes-heading" className="sr-only">
            New Year Wishes
          </h2>
          <CreateWishModal />
          <GetWishModal wishes={wishes} />
        </section>
      </div>
    </main>
  );
}
