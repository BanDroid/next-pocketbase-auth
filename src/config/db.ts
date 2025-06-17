import PocketBase from "pocketbase";

const createPocketbase = () =>
  new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_BASE_URL).autoCancellation(
    true
  );

export default createPocketbase;
