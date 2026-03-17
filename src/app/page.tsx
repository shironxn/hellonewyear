import { CreateWishModal, GetWishModal } from "@/components/wish";
import { getWishes } from "./actions";
import { Countdown } from "@/components/countdown";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Home() {
  const wishes = await getWishes();

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
        <header className="flex flex-col items-center text-center gap-4 w-full">
          <div className="w-full flex justify-end">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            New Year Countdown {new Date().getFullYear() + 1}
          </h1>
          <p className="text-muted-foreground text-lg max-w-prose">
            Welcome the new year with gratitude and hope. Share your wishes and receive inspiration from others.
          </p>
        </header>

        <section className="w-full">
          <Countdown />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
          <CreateWishModal />
          <GetWishModal wishes={wishes} />
        </section>
      </div>
    </main>
  );
}
