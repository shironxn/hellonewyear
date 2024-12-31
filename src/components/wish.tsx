"use client";

import { createWish } from "@/app/actions";
import React, { useState, useTransition } from "react";

function WishForm() {
  const [wish, setWish] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await createWish(wish);
      setWish("");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="form-control">
        <input
          className="input input-bordered"
          name="wish"
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="Ex: I wish for adventures and memories in 2025!"
        ></input>
      </label>
      <button
        type="submit"
        className="btn btn-primary mt-4 text-neutral-content"
        disabled={isPending}
      >
        Send Your Wish
        {isPending && <span className="loading loading-spinner"></span>}
      </button>
    </form>
  );
}

export function CreateWishModal() {
  const openModal = () => {
    const modal = document.getElementById("my_modal_5") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <button className="btn btn-outline" onClick={openModal}>
        Share Your Wish
      </button>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Share Your New Year Wish with Others
          </h3>
          <p className="py-4">
            Let’s start the year with big dreams! Share your wishes and lets
            inspire each other to make them happen.
          </p>
          <div className="modal-action mt-0">
            <WishForm />
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export function GetWishModal({
  wishes,
}: {
  wishes: { id: string; message: string; timestamp: number }[];
}) {
  const [wish, setWish] = useState<{
    id: string;
    message: string;
    timestamp: number;
  }>();
  const [isPending, startTransition] = useTransition();

  const openModal = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const filteredWishes = wishes.filter((item) => item.id !== wish?.id);

      setWish(filteredWishes[Math.floor(Math.random() * wishes.length)]);

      const modal = document.getElementById("my_modal_4") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    });
  };

  return (
    <div>
      <button
        className="btn btn-outline"
        onClick={() => openModal()}
        disabled={isPending}
      >
        Recive a Wish
        {isPending && <span className="loading loading-spinner"></span>}
      </button>

      <dialog id="my_modal_4" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Here’s a Special Wish Just for You! ✨
          </h3>
          <div className="mt-4 p-8 bg-base-300 rounded max-h-64 overflow-y-auto">
            <p className="text-lg text-center">{wish?.message}</p>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {new Date(Number(wish?.timestamp)).toLocaleString("en-GB", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <div className="modal-action mt-0">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
