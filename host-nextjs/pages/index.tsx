import dynamic from "next/dynamic";

// @ts-ignore
const CronogramaComponent = dynamic(() => import("cronograma/Title"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CronogramaComponent />
    </main>
  );
}
