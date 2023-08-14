<script setup>
import InputFilter from "@/components/InputFilter.vue";
import AddAddress from "@/components/AddAddress.vue";
import CardAddress from "@/components/CardAddress.vue";
import CardPlaceholder from "@/components/CardPlaceholder.vue";

import { reactive, onMounted, ref, onBeforeUpdate } from "vue";
import axios from "@/helpers/axios"

let addresses = reactive([]);

const state = reactive({
  isLoading: false  
})

const getAddress = async () => {
  addresses = []
  state.isLoading = true
  await axios
    .get('/v1/address')
    .then((response) => {
      addresses = Object.assign(addresses, response?.data?.data)
      state.isLoading = false
    });
};

const addressFiltred = async (filterData) => {
  addresses = []
  state.isLoading = true
  await axios
    .get(`/v1/address?${filterData.option}=${filterData.search}`)
    .then((response) => {
      console.log(response);
      addresses = Object.assign(addresses, response?.data?.data)
      state.isLoading = false
    });
};

onMounted(async () => {
  await getAddress();
})
</script>

<template>
  <div class="container mt-5">
    <div class="row mb-5">
      <InputFilter @filter="addressFiltred"/>
      <AddAddress @removed="getAddress" />
    </div>
    <div class="w-100 d-flex justify-content-center flex-wrap" v-if="!state.isLoading">
      <CardAddress v-for="(address, index) in addresses" :key="index" :address="address" @removed="getAddress" />
    </div>
    <div class="w-100 d-flex justify-content-center flex-wrap" v-else>
      <CardPlaceholder v-for="(address, index) in 6" :key="index"/>
    </div>

  </div>
</template>