import dynamic from "next/dynamic";
import Link from "next/link";

const CronogramaComponent = dynamic(() => import("remote/Title"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <CronogramaComponent />
      <Link href="/cronograma">To Conograma</Link>
    </main>
  );
}
