<template>
  <div ref="lifeCurve">
    <h2 v-if="show">Life Curve of {{ userInfo.name }}</h2>
    <h2 v-else>Making your life curve...</h2>
    <div class="space" />
    <template v-if="show">
      <v-sparkline
        id="curve"
        :value="value"
        :gradient="gradient"
        :smooth="radius"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        type="trend"
        height="200px"
        auto-draw
      ></v-sparkline>
      <div class="age-label">
        <div
          class="caption"
          v-for="(label, labelIdx) in ageLabels"
          :key="labelIdx"
        >
          {{ label }}
        </div>
      </div>
      <div class="space" />
      <v-row>
        <v-btn text color="red" @click="restart">Restart</v-btn>
        <v-spacer />
        <v-btn text color="primary" @click="download">Download</v-btn>
      </v-row>
    </template>
    <v-row v-else>
      <v-spacer />
      <v-progress-circular color="primary" class="ma-10" indeterminate />
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
import saveSvgAsPng from "save-svg-as-png";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    lifeData() {
      return this.$store.state.lifeData;
    },
  },
  data: () => ({
    show: false,
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [],
    ageLabels: [],
    gradientDirection: "right",
    gradients,
  }),
  methods: {
    async download() {
      var svg = document.getElementById("curve");
      saveSvgAsPng.saveSvgAsPng(svg, `LifeCurve_${this.userInfo.name}`, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
    },
    restart() {
      this.$store.state.userInfo = null;
      this.$store.state.lifeData = null;
    },
  },
  mounted() {
    const lineData = this.lifeData.map((data) => data.score);
    const ageLabel = this.lifeData.map((data) => `${data.startAge}`);
    this.value = [-20, ...lineData, 20];
    this.ageLabels = [...ageLabel, this.userInfo.age, "After Meditation"];
    setTimeout(() => {
      this.show = true;
    }, 1000);
  },
};
</script>

<style>
.age-label {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
