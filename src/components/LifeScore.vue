<template>
  <div>
    <h2>Hi {{ userInfo.name }}, <br />How do you think about your life?</h2>
    <div class="space" />
    <v-progress-linear
      color="light-blue"
      height="10"
      v-model="progress"
      striped
    ></v-progress-linear>
    <div class="msg">
      <v-fade-transition>
        <div v-if="showMsg" class="caption">
          {{ message }}
        </div>
      </v-fade-transition>
    </div>
    <v-carousel
      v-if="lifeData"
      v-model="carousel"
      height="fit-content"
      hide-delimiter-background
      hide-delimiters
      :show-arrows="false"
    >
      <v-carousel-item v-for="(item, idx) in lifeData" :key="idx">
        <p>
          {{ `When you were ${item.startAge} ~ ${item.endAge} years old.` }}
        </p>
        <div class="space" />
        <v-slider
          v-model="item.score"
          :min="min"
          :max="max"
          :tick-labels="sliderLabel"
          color="primary"
          light
          tick-size="0"
        />
        <div class="space" />
        <p>Why it was good (or bad) ? (Optional)</p>
        <v-text-field v-model="item.reason" light />
      </v-carousel-item>
    </v-carousel>

    <v-row class="pa-3">
      <button class="gradient-btn" @click="prev">
        {{ carousel === 0 ? "Reset" : "Previous" }}
      </button>
      <v-spacer />
      <button class="gradient-btn" @click="next">
        {{ carousel === 9 ? "Finish" : "Next" }}
      </button>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    progress() {
      return (this.carousel + 1) * 10;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {
    userInfo: function(info) {
      this.parseUserInfo(info);
    },
  },
  data: () => ({
    sliderLabel: [
      "Bad",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Soso",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Good",
    ],
    min: -20,
    max: 20,
    lifeData: null,
    carousel: 0,
    showMsg: false,
    message: "",
    msgList: ["Nice.", "Keep up!", "Almost there!"],
  }),
  methods: {
    parseUserInfo(info) {
      const max = parseInt(info.age);
      const step = max / 10;
      const lifeData = [];

      for (let age = 0; age < max; age += step) {
        lifeData.push({
          startAge: Math.round(age),
          endAge: age + step > max ? max : Math.round(age + step),
          score: 0,
          reason: "",
        });
      }

      this.lifeData = lifeData;
    },
    next() {
      if (this.carousel === 9) {
        this.$store.state.lifeData = this.lifeData;
      } else {
        if (this.carousel % 3 === 2) {
          this.showMessage(this.msgList[Math.floor(this.carousel / 3)]);
        }
        this.carousel += 1;
      }
    },
    prev() {
      if (this.carousel === 0) {
        this.$store.state.userInfo = null;
      } else {
        this.carousel -= 1;
      }
    },

    showMessage(msg) {
      this.showMsg = true;
      this.message = msg;
      setTimeout(() => {
        this.showMsg = false;
      }, 1000);
    },
  },
  mounted() {
    this.parseUserInfo(this.userInfo);
  },
};
</script>

<style>
.msg {
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
