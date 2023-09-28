import { createRoot } from "react-dom/client";

export default function mount(el: HTMLElement, component: any) {
  createRoot(el).render(component);
}
