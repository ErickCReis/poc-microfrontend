<script lang="ts" setup>
import { onMounted, ref } from "vue";

const mount = (await import("remote/mount")).default;
const component = (await import("remote/AppRouter")).default;

const elRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!elRef.value) return;

  mount(elRef.value, component({ title: "test", basepath: "" }));
});
</script>

<template>
  <div ref="elRef"></div>
</template>
