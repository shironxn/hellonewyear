"use server";

import { push, ref, set, serverTimestamp, get } from "firebase/database";
import { database } from "@/lib/firebase";
import { revalidatePath } from "next/cache";

export async function createWish(message: string) {
  if (message.length === 0) {
    return;
  }

  const dataRef = push(ref(database, "wishes"));
  await set(dataRef, {
    message: message.trim(),
    timestamp: serverTimestamp(),
  });

  revalidatePath("/");
}

export async function getWishes() {
  const dataRef = ref(database, "wishes");
  return get(dataRef);
}
