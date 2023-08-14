<script setup>
import { reactive } from 'vue';
import axios from "@/helpers/axios"

const emit = defineEmits(['filter'])

const state = reactive({
  isLoading: false,
  isNeighborhood: false,
})

const filterData = reactive({
  search: '',
  option: ''
})

const filter = async () => {
  state.isLoading = true
  filterData.option = state.isNeighborhood ? 'neighborhood' : 'cep'
  emit('filter', filterData)
};

const changeValue = () => {
  search = ''
};
</script>

<template>

  
  <div class="row col-md-11">
    <div class="input-group">
      <div class="col-4 col-md-2 mx-2">
        <label class="visually-hidden" for="specificSizeSelect">Preference</label>
        <select class="form-select" id="specificSizeSelect" v-model="state.isNeighborhood" @input="changeValue">
          <option :value="1">Lougradouro</option>
          <option :value="0">CEP</option>
        </select>
      </div>
      <input type="text" class="form-control" v-model="filterData.search" placeholder="Filtrar" v-if="state.isNeighborhood"/>
      <input type="text" class="form-control" v-model="filterData.search" placeholder="Filtrar" v-mask="'#####-###'" v-else/>
      <button class="btn btn-primary" type="button" @click="filter">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>