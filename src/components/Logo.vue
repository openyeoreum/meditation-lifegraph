<template>
  <div class="relative">
    <v-sparkline
      class="opaque"
      :value="value"
      :gradient="gradient"
      :smooth="radius"
      :padding="padding"
      :line-width="width"
      :stroke-linecap="lineCap"
      :gradient-direction="gradientDirection"
      type="trend"
      auto-draw
    ></v-sparkline>
    <div class="gradient-title">Life Curve</div>
  </div>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  data: () => ({
    width: 4,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "right",
    gradients
  })
};
</script>

<style>
.relative {
  position: relative;
}

.opaque {
  opacity: 0.3;
}

.gradient-title {
  width: fit-content;
  position: absolute;
  top: 25px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  margin: auto;
  z-index: 2;
  font-size: 50px;
  letter-spacing: 5px;
  background: linear-gradient(270deg, #f72047, #ffd200, #1feaea);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>