import { getValidatedTopUsers } from './getValidatedTopUsers.js';

(async () => {
    const users = await getValidatedTopUsers();
    console.log('Final Result:\n', users);
})();
