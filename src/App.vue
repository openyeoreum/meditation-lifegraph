<template>
  <v-app>
    <v-content class="bg-gradient">
      <div class="wrapper">
        <h1 class="text-white">
          Meditation: A way to achieve your goals in your life
        </h1>
        <div class="space" />
        <div class="space" />
        <v-card class="card__main" elevation="10">
          <v-expand-transition>
            <general-info v-if="!userInfo" />
            <life-score v-else-if="!lifeData" />
            <life-curve v-else />
          </v-expand-transition>
        </v-card>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import GeneralInfo from "@/components/GeneralInfo.vue";
import LifeScore from "@/components/LifeScore.vue";
import LifeCurve from "@/components/LifeCurve.vue";

export default {
  name: "App",

  components: {
    GeneralInfo,
    LifeScore,
    LifeCurve,
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    lifeData() {
      return this.$store.state.lifeData;
    },
  },

  data: () => ({
    //
  }),
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
  width: 550px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card__main {
  width: 550px;
  padding: 20px;
}

.text-white {
  color: white;
}

.space {
  margin-bottom: 25px;
}

@media only screen and (max-width: 880px) {
  .wrapper {
    width: 100vw;
    padding: 25px;
  }

  .card__main {
    width: 100%;
  }

  .v-slider__tick-label {
    font-size: 6px;
  }
}
</style>
