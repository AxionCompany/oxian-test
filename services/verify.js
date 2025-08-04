import { delay } from "../utils/time.js";

export async function verifyUser(userId) {
    await delay(Math.random() * 100);

    const fraudulent = ['u2', 'u4'];
    return fraudulent.includes(userId);
}

export async function verifyResult(params) {
    await delay(200);
    return true;
}
