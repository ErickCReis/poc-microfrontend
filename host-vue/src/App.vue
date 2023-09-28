<template>
  <Suspense>
    <template #default>
      <CustomReact />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script lang="ts">
import CustomReact from "./CustomReact.vue";
export default {
  name: "App",
  components: {
    CustomReact,
  },
};
</script>
