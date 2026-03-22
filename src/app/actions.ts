"use server";

import { database } from "@/lib/firebase";
import { get, push, ref, serverTimestamp, set } from "firebase/database";
import { revalidatePath } from "next/cache";

export type Wish = {
  id: string;
  name?: string;
  message: string;
  timestamp: number;
};

export async function createWish(message: string, name?: string) {
  if (!message || message.trim().length === 0) {
    return { success: false, error: "Message cannot be empty" };
  }

  try {
    const dataRef = push(ref(database, "wishes"));
    await set(dataRef, {
      message: message.trim(),
      name: name?.trim() || null,
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

export async function reportWish(wishId: string, reason?: string) {
  try {
    const reportRef = push(ref(database, "reports"));
    await set(reportRef, {
      wishId,
      reason: reason?.trim() || "No reason provided",
      timestamp: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error reporting wish:", error);
    return { success: false, error: "Failed to report wish" };
  }
}
