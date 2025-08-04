import { delay } from "../utils/time.js";
import { random } from "../utils/math.js";

const users = {
    u1: { id: 'u1', name: 'Alice', score: 92 },
    u2: { id: 'u2', name: 'Bob', score: 79 },
    u3: { id: 'u3', name: 'Carol', score: 95 },
    u4: { id: 'u4', name: 'Dave', score: 83 },
    u5: { id: 'u5', name: 'Eve', score: 77 },
    u6: { id: 'u6', name: 'Frank', score: 88 },
    u7: { id: 'u7', name: 'Grace', score: null },
};

export async function fetch(url) {
    await delay(random(30, 100));
    if (url === '/api/user-ids') {
        return {
            ok: true,
            async json() {
                return Object.keys(users);
            }
        };
    }

    const match = url.match(/\/api\/users\/(.+)/);
    if (match) {
        const id = match[1];
        const user = users[id];

        return {
            ok: !!user,
            async json() {
                return user;
            }
        };
    }

    return { ok: false, async json() { return {}; } };
}
