import dynamic from "next/dynamic";

const AppRouterComponent = dynamic(() => import("cronograma/AppRouter"), {
  ssr: false,
});

export default function Page() {
  return <AppRouterComponent title="teste" basepath="cronograma" />;
}
