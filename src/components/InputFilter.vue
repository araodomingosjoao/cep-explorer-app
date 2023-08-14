<script setup>
import { reactive } from 'vue';
import axios from "@/helpers/axios"

const state = reactive({
  isLoading: false
})

var search = reactive();
var data = reactive({});

const filter = async () => {
  state.isLoading = true
  await axios
    .get(`/v1/address?cep=${search}`)
    .then((response) => {
      console.log(response);
      data = Object.assign(data, response?.data?.data)
      state.isLoading = false
    });
};

</script>

<template>
  <div class="col-md-11">
    <div class="input-group">
      <input type="text" class="form-control" v-model="search" placeholder="Filtrar" v-mask="'#####-###'" />
      <button class="btn btn-primary" type="button" @click="filter">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>