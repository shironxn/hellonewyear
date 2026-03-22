"use server";

import { database } from "@/lib/firebase";
import { get, push, ref, serverTimestamp, set } from "firebase/database";
import { revalidatePath } from "next/cache";

export type Wish = {
  id: string;
  message: string;
  timestamp: number;
};

export async function createWish(message: string) {
  if (!message || message.trim().length === 0) {
    return { success: false, error: "Message cannot be empty" };
  }

  try {
    const dataRef = push(ref(database, "wishes"));
    await set(dataRef, {
      message: message.trim(),
      timestamp: serverTimestamp(),
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating wish:", error);
    return { success: false, error: "Failed to share wish" };
  }
}

export async function getWishes(): Promise<Wish[]> {
  try {
    const wishesRef = ref(database, "wishes");
    const snapshot = await get(wishesRef);

    const wishes: Wish[] = [];
    snapshot.forEach((childSnapshot) => {
      wishes.push({
        id: childSnapshot.key as string,
        ...(childSnapshot.val() as Omit<Wish, "id">),
      });
    });

    return wishes;
  } catch (error) {
    console.error("Error fetching wishes:", error);
    return [];
  }
}
