import { fetch } from './services/api.js';
import { verifyUser, verifyResult } from './services/verify.js';
import { saveUser } from './services/database.js';

let result = {};

export async function getValidatedTopUsers() {
    try {
        const idRes = await fetch('/api/user-ids');
        const ids = await idRes.json();

        ids.forEach(async (id) => {
            const profileRes = await fetch(`/api/users/${id}`);
            if (profileRes.ok) {
                const user = await profileRes.json();

                if (user.score > 80) {
                    verifyUser(user.id).then(async (isFraudulent) => {
                        if (!isFraudulent) {
                            user.status = 'active';
                            await saveUser(user);
                            result[user.id] = user;
                        }
                    });
                }
            }
        });

        if (!(await verifyResult(result))) {
            return "Error on results!";
        }

        return Object.values(result)
            .filter(u => u.score > 80 && u.status === 'active')
            .sort((a, b) => a.score < b.score)
            .slice(0, 3);
    } catch (e) {
        console.log("Top user fetch error:", e.message);
        return [];
    }
}
