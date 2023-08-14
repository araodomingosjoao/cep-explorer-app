<script setup>
import { reactive } from 'vue';
import axios from "@/helpers/axios"

const emit = defineEmits(['filter'])

const state = reactive({
  isLoading: false,
  isCEP: false,
})

const filterData = reactive({
  search: '',
  option: ''
})

const filter = async () => {
  state.isLoading = true
  filterData.option = state.isCEP ? 'cep' : 'neighborhood'
  emit('filter', filterData)
};

const changeValue = () => {
  search = ''
};
</script>

<template>
  <div class="col-md-11">
    <div class="input-group">
      <div class="col-sm-2 mx-3">
        <label class="visually-hidden" for="specificSizeSelect">Preference</label>
        <select class="form-select" id="specificSizeSelect" v-model="state.isCEP" @input="changeValue">
          <option selected>Selecione</option>
          <option :value="1">CEP</option>
          <option :value="0">Lougradouro</option>
        </select>
      </div>
      <input type="text" class="form-control" v-model="filterData.search" placeholder="Filtrar" v-mask="'#####-###'" v-if="state.isCEP"/>
      <input type="text" class="form-control" v-model="filterData.search" placeholder="Filtrar" v-else/>
      <button class="btn btn-primary" type="button" @click="filter">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>