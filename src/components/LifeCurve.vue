<template>
  <div ref="lifeCurve">
    <h2 v-if="!show">Making your life graph...</h2>
    <div v-else id="graph">
      <h2>Life Graph of {{ userInfo.name }}</h2>

      <v-row v-if="show" class="graph-wrap">
        <v-col sm="1" class="y-axis caption">
          <span>10</span>
          <span>0</span>
          <span>-10</span>
        </v-col>
        <v-col sm="11">
          <canvas v-if="topHeight !== '0px'" :height="topHeight" />
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
            :height="graphHeight"
            auto-draw
          ></v-sparkline>
          <canvas v-if="bottomHeight !== '0px'" :height="bottomHeight" />
          <div class="age-label">
            <div class="caption" v-for="(label, labelIdx) in ageLabels" :key="labelIdx">{{ label }}</div>
          </div>
        </v-col>
        <div class="space" />
      </v-row>
    </div>
    <v-row v-if="show">
      <v-btn text color="red" @click="restart">Restart</v-btn>
      <v-spacer />
      <v-btn text color="primary" @click="download">Download</v-btn>
    </v-row>
    <v-row v-else>
      <v-spacer />
      <v-progress-circular color="primary" class="ma-10" indeterminate />
      <v-spacer />
    </v-row>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    lifeData() {
      return this.$store.state.lifeData;
    },
    innerHeight() {
      var style = window.getComputedStyle(
        document.getElementById("axis"),
        null
      );
      return style.getPropertyValue("height");
    },

    graphHeight() {
      const scores = this.lifeData.map(data => data.score);
      const maxScore = Math.max(...scores);
      const minScore = Math.min(...scores);
      const height = 10 * (maxScore - minScore + 1);
      return `${height}px`;
    },
    topHeight() {
      const scores = this.lifeData.map(data => data.score);
      const maxScore = Math.max(...scores);

      const height = 15 * (10 - maxScore + 1);
      return `${height}px`;
    },
    bottomHeight() {
      const scores = this.lifeData.map(data => data.score);
      const minScore = Math.min(...scores);
      const height = 15 * (10 + minScore);
      return `${height}px`;
    }
  },
  data: () => ({
    show: false,
    width: 5,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [],
    ageLabels: [],
    gradientDirection: "right",
    gradients
  }),
  methods: {
    async download() {
      var node = document.getElementById("graph");

      let that = this;

      domtoimage
        .toPng(node, {
          bgcolor: "white",
          width: 600,
          height: 450,
          style: {
            display: "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "align-items": "center",
            "padding-top": "20px",
            "white-space": "nowrap"
          }
        })
        .then(function(dataUrl) {
          var a = document.createElement("a");
          a.download = `LifeGraph_${that.userInfo.name}`;
          a.href = dataUrl;

          a.click();
        })
        .catch(() => {
          console.log(node);
        });
    },
    restart() {
      this.$store.state.userInfo = null;
      this.$store.state.lifeData = null;
    }
  },
  mounted() {
    const lineData = this.lifeData.map(data => data.score);
    const ageLabel = this.lifeData.map(data => `${data.endAge}`);
    this.value = [...lineData];
    this.ageLabels = [0, ...ageLabel];
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }
};
</script>

<style>
div.caption {
  white-space: nowrap;
}

.age-label {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  word-break: keep-all;
  padding: 40px 6px 40px 6px !important;
}

.graph-wrap {
  height: 400px;
}

@media only screen and (max-width: 880px) {
  .y-axis {
    display: none;
  }
}
</style>

