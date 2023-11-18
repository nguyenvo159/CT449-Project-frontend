<script>
import AppHeader from "@/components/partials/AppHeader.vue";
import AppFooter from "@/components/partials/AppFooter.vue";


export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<template>
  <AppHeader />

  <div id="app">
    <router-view />
  </div>

  <AppFooter />
</template>

<style></style>
