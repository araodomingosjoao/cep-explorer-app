<script setup>
import { reactive, onMounted, ref } from 'vue';

import axios from "@/helpers/axios"
import swal from 'sweetalert';

const props = defineProps({
  address: Object,
  openModal: {
    type: Function
  }
})

const emit = defineEmits(['removed', 'edit'])

const state = reactive({
  isLoading: false
})

var data = reactive({})

data = props.address

const remove = (data) => {
  swal({
    title: "Tens a certeza?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then(async (willDelete) => {
      if (willDelete) {
        await axios
          .delete(`/v1/address/${data.id}`)
          .then((response) => {
            state.isLoading = false
            swal("Poof! Endereço removido com sucesso!", {
              icon: "success",
            }).then((resSwal) => {
              if (resSwal) {
                emit('removed')
                closeModal()
              }
            });
          });
      }
    });
};
</script>

<template>
  <div class="card mx-3 mb-5">
    <div class="card-header">
      <h3 class="highlight p-2 mb-0 text-center">{{ data?.cep }}</h3>
    </div>
    <div class="card-body">
      <p>Cidade: {{ data?.city ? data?.city: 'Sem informação' }}</p>
      <p>Estado: {{ data?.uf ? data?.uf: 'Sem informação' }}</p>
      <p>Bairro: {{ data?.street ? data?.street: 'Sem informação' }}</p>
      <p>Lougradouro: {{ data?.neighborhood ? data?.neighborhood: 'Sem informação' }}</p>
      <div class="actions">
        <button class="btn btn-secondary" @click="props.openModal(data)">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-danger" @click="remove(data)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>