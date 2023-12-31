<script setup>
import { reactive, onMounted } from 'vue';
import { Modal } from 'bootstrap'

import swal from 'sweetalert';
import axios from "@/helpers/axios"

const emit = defineEmits(['removed'])

let myModal = reactive({})

var data = reactive({
  cep: '',
  city: '',
  street: '',
  uf: '',
  neighborhood: '',
});

var errors = reactive({
  cep: '',
  city: '',
  street: '',
  uf: '',
  neighborhood: '',
})

const state = reactive({
  isLoading: false  
})

const closeModal = () => {
  myModal.hide()
  cleanAttribute();
};

const cleanAttribute = () => {
  errors.cep = '';
  errors.city = '';
  errors.street = '';
  errors.uf = '';
  errors.neighborhood = '';

  data.cep = '';
  data.city = '';
  data.street = '';
  data.uf = '';
  data.neighborhood = '';
};

const validate = async () => {
  errors.cep = '';
  errors.city = '';
  errors.street = '';
  errors.uf = '';
  errors.neighborhood = '';

  if (data.cep === '') {
    errors.cep = 'O campo cep é obrigatório';
  }

  const cepPattern = /^\d{5}-\d{3}$/; // Expressão regular para o formato XXXXX-XXX

  if (data.cep != '' && !cepPattern.test(data.cep)) {
    errors.cep = 'O campo cep deve cumprir o formato XXXXX-XXX';
  }

  if (data.city === '') {
    errors.city = 'O campo cidade é obrigatório.';
  }

  if (data.street === '') {
    errors.street = 'O campo bairro é obrigatório.';
  }

  if (data.uf === '') {
    errors.uf = 'O campo uf é obrigatório.';
  }

  if (data.neighborhood === '') {
    errors.neighborhood = 'O campo lougradouro é obrigatório.';
  }

};

const create = async () => {
  validate();
  if (!Object.values(errors).some(error => error !== '')) {
    state.isLoading = true
    await axios
      .post('/v1/address', data)
      .then((response) => {
        state.isLoading = false
        swal("Endereço cadastrado!", "Seu endereço foi cadastrado com sucesso!", "success")
        .then((resSwal) => {
          if (resSwal) {
            emit('removed')
            closeModal()
          }
        });
      });
  }
};

onMounted(() => {
  myModal = new Modal('#staticBackdrop')
})
</script>

<template>
  <div class="col-md-1 text-md-end">
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i
        class="fas fa-plus"></i></button>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Cadastrar Endereço</h1>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form class="g-3 needs-validation" novalidate>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="cep" class="col-form-label">CEP:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.cep }" id="cep" v-model="data.cep"
                  v-mask="'#####-###'" min="0" required>
                <div class="invalid-feedback">
                  {{ errors.cep }}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="city" class="col-form-label">Cidade:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.city }" id="city"
                  v-model="data.city">
                <div class="invalid-feedback">
                  {{ errors.city }}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="street" class="col-form-label">Bairro:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.street }" id="street"
                  v-model="data.street">
                <div class="invalid-feedback">
                  {{ errors.street }}
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="uf" class="col-form-label">Estado:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.uf }" id="uf" v-model="data.uf">
                <div class="invalid-feedback">
                  {{ errors.uf }}
                </div>
              </div>
              <div class="col-md-8 mb-3">
                <label for="neighborhood" class="col-form-label">Lougradouro:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.neighborhood }" id="neighborhood"
                  v-model="data.neighborhood">
                <div class="invalid-feedback">
                  {{ errors.neighborhood }}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div v-if="!state.isLoading"> 
            <button type="button" class="btn btn-secondary mx-2" @click="closeModal"> <i class="fa fa-xmark"></i>
              Cancelar</button>
            <button type="button" class="btn btn-primary" @click="create()"> <i class="fa fa-save"></i> Salvar</button>
          </div>
          <div v-else>
            <button type="button" class="btn btn-secondary mx-2" disabled> <i class="fa fa-xmark"></i>
              Cancelar</button>
            <button type="button" class="btn btn-primary disabled" disabled> <i class="fa fa-save"></i> Salvando...</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>