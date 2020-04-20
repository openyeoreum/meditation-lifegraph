<template>
  <v-form ref="form" v-model="valid">
    <h2>Let's get started!</h2>
    <div class="space" />
    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
    <v-text-field v-model="age" type="number" :rules="ageRules" label="Age" required></v-text-field>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <div class="space" />
    <button class="gradient-btn" v-bind:class="{ 'disabled' : !valid }">Start</button>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    age: null,
    ageRules: [v => !!v || "Age is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style>
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
</style>