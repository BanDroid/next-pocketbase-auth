import { auth } from "@/util/auth";

export default async function Page() {
  const { token, model } = await auth();

  return (
    <>
      <main>
        <section className="flex items-center justify-center p-12">
          Dashboard is a private route, only authenticated user could access it.
        </section>
        <section className="flex items-center justify-center p-12">
          username: {model?.name}
          <br />
          {JSON.stringify(model)}
        </section>
      </main>
    </>
  );
}
