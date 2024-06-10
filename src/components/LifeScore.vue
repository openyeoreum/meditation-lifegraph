<template>
  <div>
    <h2>
      안녕하세요. {{ userInfo.name }}님,
      <br />곰곰히 나의 인생을 돌아볼까요?
    </h2>
    <div class="space" />
    <v-progress-linear color="light-blue" height="10" v-model="progress" striped></v-progress-linear>
    <div class="msg">
      <v-fade-transition>
        <div v-if="showMsg" class="caption">{{ message }}</div>
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
        <p>{{ `당신의 나이 ${item.startAge} ~ ${item.endAge} 때의 행복 점수는?` }}</p>
        <div class="space" />
        <v-slider
          v-model="item.score"
          :min="min"
          :max="max"
          :tick-labels="tickLabel"
          color="primary"
          light
          tick-size="0"
        />
        <div class="slider-label">
          <span>나쁨</span>
          <span class="middle">보통</span>
          <span>좋음</span>
        </div>
        <div class="space" />

        <p>해당 점수를 선택한 이유는? (상세히 작성)</p>
        <v-text-field v-model="item.reason" light />
      </v-carousel-item>
    </v-carousel>

    <v-row class="pa-3">
      <button class="gradient-btn" @click="prev">{{ carousel === 0 ? "Reset" : "Previous" }}</button>
      <v-spacer />
      <button class="gradient-btn" @click="next">{{ carousel === final ? "Finish" : "Next" }}</button>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    progress() {
      return this.lifeData
        ? ((this.carousel + 1) * 100) / this.lifeData.length
        : 0;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    final() {
      return this.lifeData ? this.lifeData.length - 1 : 0;
    }
  },
  watch: {
    userInfo: function(info) {
      this.parseUserInfo(info);
    }
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
      "Good"
    ],
    tickLabel: [
      "-10",
      "",
      "-8",
      "",
      "-6",
      "",
      "-4",
      "",
      "-2",
      "",
      "0",
      "",
      "2",
      "",
      "4",
      "",
      "6",
      "",
      "8",
      "",
      "10"
    ],
    min: -10,
    max: 10,
    lifeData: null,
    carousel: 0,
    showMsg: false,
    message: "",
    msgList: ["좋아요.", "지속해 보자구요!", "거의 다 왔어요!"]
  }),
  methods: {
    parseUserInfo(info) {
      const max = parseInt(info.age);
      const step = Math.round(max / 10);
      const lifeData = [];

      for (let age = 0; age < max; age += step) {
        lifeData.push({
          startAge: Math.round(age),
          endAge: age + step > max ? max : age + step,
          score: 0,
          reason: ""
        });
      }

      this.lifeData = lifeData;
    },
    next() {
      if (this.carousel === this.lifeData.length - 1) {
        this.$store.state.lifeData = this.lifeData;
      } else {
        let oneThird = Math.floor(this.lifeData.length / 3);
        if (this.carousel % oneThird === 0) {
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
    }
  },
  mounted() {
    this.parseUserInfo(this.userInfo);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans", sans-serif !important;
}

.msg {
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.slider-label {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}

.middle {
  margin-left: 10px;
}
</style>
