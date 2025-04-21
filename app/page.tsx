import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <Link href="/status">Status</Link>
      </div>
    </main>
  );
}
