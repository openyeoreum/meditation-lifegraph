<template>
  <v-form ref="form" v-model="valid">
    <div class="space" />
    <logo />
    <div class="space" />

    <h2>작성자 정보</h2>
    <div class="space" />
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="이름"
      required
    ></v-text-field>
    <v-text-field
      v-model="age"
      type="number"
      :rules="ageRules"
      label="나이"
      required
    ></v-text-field>
    <v-text-field
      v-model="region"
      :rules="regionRules"
      label="사는 지역"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="이메일"
      required
    ></v-text-field>
    <div class="space" />
    <button
      class="gradient-btn"
      :disabled="!valid"
      v-bind:class="{ disabled: !valid }"
      @click="submit"
    >
      Start
    </button>
    <div class="logos">
      <img class="logo" :src="logoCoursera" />
      <img class="logo" :src="logoKaist" />
    </div>
  </v-form>
</template>

<script>
import Logo from "@/components/Logo.vue";

import kaist from "@/assets/KAIST-Logo.wine.svg";
import coursera from "@/assets/coursera.png";

export default {
  components: {
    Logo,
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    age: null,
    ageRules: [
      (v) => !!v || "Age is required",
      (v) => v >= 10 || "Too young to think about life...",
    ],
    region: "",
    regionRules: [(v) => !!v || "Region is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    logoKaist: kaist,
    logoCoursera: coursera,
  }),
  methods: {
    submit(e) {
      e.preventDefault();
      this.$store.state.userInfo = {
        name: this.name,
        age: this.age,
        region: this.region,
        email: this.email,
      };
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans", sans-serif !important;
}

.gradient-btn {
  width: 100px;
  height: 40px;
  background: rgb(0, 65, 145);
  color: white;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
  transition: 0.3s ease-in-out;
}

.gradient-btn:hover {
  background: rgb(95, 190, 235);
  transition: 0.3s ease-in-out;
}

.disabled {
  opacity: 0.3;
  transition: 0.3s ease-in-out;
  cursor: default;
}

.disabled:hover {
  background: rgb(0, 65, 145);
}

.logos {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.logo {
  height: 50px;
  object-fit: contain;
}
</style>
