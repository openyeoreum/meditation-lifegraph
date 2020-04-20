<template>
  <v-app>
    <v-content class="bg-gradient">
      <div class="wrapper">
        <h1 class="text-white">Meditation: A way to achieve your goals in your life</h1>
        <div class="space" />
        <div class="space" />
        <v-card class="card__main" elevation="10">
          <v-expand-transition>
            <general-info v-if="true" />
          </v-expand-transition>
        </v-card>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import GeneralInfo from "@/components/GeneralInfo.vue";

export default {
  name: "App",

  components: {
    GeneralInfo
  },

  data: () => ({
    //
  })
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans", sans-serif !important;
}

.bg-gradient {
  background: linear-gradient(90deg, rgb(0, 65, 145), rgb(95, 190, 235));
}

.wrapper {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card__main {
  width: 500px;
  padding: 20px;
}

.text-white {
  color: white;
}

.space {
  margin-bottom: 25px;
}
</style>
