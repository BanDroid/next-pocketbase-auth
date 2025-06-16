import PocketBase from "pocketbase";

const db = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL);
db.autoCancellation(false);

export default db;
