<template>
  <div ref="lifeCurve">
    <div id="graph">
      <h2>{{ userInfo.name }}님의 라이프 그래프,<br>진단된 내용은 이메일로 전해 드릴게요.</h2>
      <div class="space" />
      <div class="graph-wrap">
        <line-chart class="width-100" :chartData="chartdata" :options="options" />
      </div>
      <div class="space" />
    </div>
    <v-row>
      <v-btn text color="red" @click="restart">Restart</v-btn>
      <v-spacer />
      <v-btn text color="primary" @click="download">Download</v-btn>
    </v-row>
  </div>
</template>

<script>
import firebase from "@/firebase.js";
import domtoimage from "dom-to-image";
import LineChart from "@/components/LineChart.vue";

export default {
  components: {
    LineChart
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    lifeData() {
      return this.$store.state.lifeData;
    }
  },
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "life-graph",
          backgroundColor: "",
          borderColor: "",
          data: []
        }
      ]
    },
    options: {
      responsive: true,

      legend: {
        display: false
      },
      fill: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: "Age"
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Score"
            },
            ticks: {
              min: -10,
              max: 10,
              stepSize: 2
            }
          }
        ]
      }
    }
  }),
  methods: {
    async download() {
      try {
        var node = document.getElementById("graph");
        const dataUrl = await this.getImage(node);
        var name = this.userInfo.name;
        var timestamp = new Date().toISOString();
        var a = document.createElement("a");
        a.download = `lifegraph_${name}_${timestamp}.png`;
        a.href = dataUrl;
        a.click();
      } catch (err) {
        alert(err.message);
      }
    },
    getImage(node) {
      return domtoimage.toPng(node, {
        bgcolor: "white",
        width: 600,
        height: 600,
        style: {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
          "align-items": "center",
          "padding-top": "20px",
          "white-space": "nowrap"
        }
      });
    },
    restart() {
      this.$store.state.userInfo = null;
      this.$store.state.lifeData = null;
    },
    pushToFirebase(blob, name) {
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var graphRef = storageRef.child(name);

      var userInfo = this.userInfo;
      var lifeData = this.lifeData;
      var timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14); // 날짜만 사용

      graphRef.put(blob).then(snapshot => {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          firebase
            .database()
            .ref(`${userInfo.name}(${timestamp})`)
            .set({
              name: userInfo.name,
              email: userInfo.email,
              age: userInfo.age,
              region: userInfo.region,
              lifeData,
              graph_url: downloadURL
            });
        });
      });
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);

      var mimeString = dataURI
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];

      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
  },
  mounted() {
    const lineData = this.lifeData.map(data => data.score);
    const ageLabel = this.lifeData.map(
      data => `${data.startAge}-${data.endAge}`
    );
    var ctx = document.getElementById("line-chart").getContext("2d");
    var gradient = ctx.createLinearGradient(500, 0, 100, 0);
    gradient.addColorStop(0, "#f72047");
    gradient.addColorStop(0.5, "#ffd200");
    gradient.addColorStop(1, "#1feaea");

    const chartdata = {
      labels: ageLabel,
      datasets: [
        {
          label: "",
          fill: false,
          backgroundColor: gradient,
          borderColor: gradient,
          data: lineData
        }
      ]
    };
    this.chartdata = chartdata;
    setTimeout(async () => {
      var node = document.getElementById("graph");
      const dataUrl = await this.getImage(node);
      var blob = this.dataURItoBlob(dataUrl);
      var name = this.userInfo.name;
      var email = this.userInfo.email;
      var timestamp = new Date().toISOString();
      this.pushToFirebase(blob, `lifegraph_${name}_${email}__${timestamp}`);
    }, 1000);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans", sans-serif !important;
}

div.caption {
  white-space: nowrap;
}

.graph-wrap {
  width: 100%;
  position: relative;
}

.width-100 {
  width: 100%;
}

@media only screen and (max-width: 880px) {
  .y-axis {
    display: none;
  }
}
</style>
