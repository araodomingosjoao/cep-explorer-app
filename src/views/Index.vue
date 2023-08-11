<script setup>
import InputFilter from "@/components/InputFilter.vue";
import AddAddress from "@/components/AddAddress.vue";
import CardAddress from "@/components/CardAddress.vue";
import { reactive } from "vue";

const addresses = reactive([
  {
    cep: "12345-678",
    city: "São Paulo",
    neighborhood: "Bairro Exemplo",
    state: "SP",
  },
  {
    cep: "98765-432",
    city: "Rio de Janeiro",
    neighborhood: "Bairro Outro Exemplo",
    state: "RJ",
  },
  {
    cep: "98765-432",
    city: "Rio de Janeiro",
    neighborhood: "Bairro Outro Exemplo",
    state: "RJ",
  },
  {
    cep: "98765-432",
    city: "Rio de Janeiro",
    neighborhood: "Bairro Outro Exemplo",
    state: "RJ",
  },
  {
    cep: "98765-432",
    city: "Rio de Janeiro",
    neighborhood: "Bairro Outro Exemplo",
    state: "RJ",
  },
  {
    cep: "98765-432",
    city: "Rio de Janeiro",
    neighborhood: "Bairro Outro Exemplo",
    state: "RJ",
  },
]);
</script>

<template>
  <div class="container mt-5">
    <div class="row mb-5">
      <InputFilter />
      <AddAddress />
    </div>
    <div class="w-100 d-flex justify-content-center flex-wrap">
      <CardAddress v-for="(address, index) in addresses" :key="index" />
    </div>
  </div>
</template>