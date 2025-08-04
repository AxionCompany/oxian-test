import { delay } from "../utils/time.js";

export async function saveUser(user) {
    await delay(Math.random() * 80);
    return true;
}