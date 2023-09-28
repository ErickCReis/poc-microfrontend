<script lang="ts" setup>
// @ts-ignore
const mount = (await import("remote/mount")).default;
// @ts-ignore
const component = (await import("remote/AppRouter")).default;
// @ts-ignore
mount(document.getElementsByTagName("div")[0], component({ title: "test" }));
</script>

<template>
  <div id="#react">test</div>
</template>
