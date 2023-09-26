import dynamic from "next/dynamic";

const AppRouterComponent = dynamic(() => import("remote/AppRouter"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function Page() {
  return (
    <AppRouterComponent title="teste" basepath="cronograma" />
  );
}
