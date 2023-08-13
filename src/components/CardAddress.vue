<script setup>
import { reactive, onMounted, ref } from 'vue';
import axios from 'axios';
import swal from 'sweetalert';
import { Modal } from 'bootstrap'

const props = defineProps({
  address: Object,
})

let myModal = reactive({})

var data = props.address

var dataForm = ref({})

var errors = reactive({
  cep: '',
  city: '',
  street: '',
  uf: '',
  neighborhood: '',
})

const cleanAttribute = () => {
  errors.cep = '';
  errors.city = '';
  errors.street = '';
  errors.uf = '';
  errors.complement = '';
  errors.neighborhood = '';
};

const validate = async () => {

  cleanAttribute();

  if (dataForm.value.cep === '') {
    errors.cep = 'O campo cep é obrigatório';
  }

  const cepPattern = /^\d{5}-\d{3}$/; // Expressão regular para o formato XXXXX-XXX

  if (data.cep != '' && !cepPattern.test(data.cep)) {
    errors.cep = 'O campo cep deve cumprir o formato XXXXX-XXX';
  }

  if (dataForm.value.city === '') {
    errors.city = 'O campo cidade é obrigatório.';
  }

  if (dataForm.value.street === '') {
    errors.street = 'O campo bairro é obrigatório.';
  }

  if (dataForm.value.uf === '') {
    errors.uf = 'O campo uf é obrigatório.';
  }

  if (dataForm.value.neighborhood === '') {
    errors.neighborhood = 'O campo lougradouro é obrigatório.';
  }

};

const openModal = (data) => {
  myModal.show()
  localStorage.setItem('address', JSON.stringify(data))
  // Object.assign(dataForm.value , JSON.parse(localStorage.getItem('address')))
  dataForm.value = JSON.parse(localStorage.getItem('address'))
  console.log("ff", dataForm.value);
};

const closeModal = () => {
  myModal.hide()
  cleanAttribute();
  localStorage.removeItem('address')
};

const update = async () => {

  validate();

  if (!Object.values(errors).some(error => error !== '')) {
    await axios
      .post('/api/v1/addrress', data)
      .then((response) => {
        console.log(response);
      });
  }
};

const remove = (data) => {
  swal({
    title: "Tens a certeza?",
    text: "Uma vez excluído, você não será capaz de recuperar este endereço!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Endereço foi excluído!", {
          icon: "success",
        });
      }
    });
};

onMounted(() => {
  myModal = new Modal('#editAddressModal')
})
</script>

<template>
  <div class="card mx-3 mb-5">
    <div class="card-header">
      <h3 class="highlight p-2 mb-0 text-center">{{ data?.cep }}</h3>
    </div>
    <div class="card-body">
      <p>Cidade: {{ data?.city }}</p>
      <p>Bairro: {{ data?.street }}</p>
      <p>Lougradouro: {{ data?.neighborhood }}</p>
      <div class="actions">
        <button class="btn btn-secondary" @click="openModal(data)">
          <i class="fas fa-pencil-alt"></i> Editar
        </button>
        <button class="btn btn-danger" @click="remove(data)">
          <i class="fas fa-trash-alt"></i> Remover
        </button>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="editAddressModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="editAddressModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editAddressModalLabel">Cadastrar Endereço</h1>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <form class="g-3 needs-validation" novalidate>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="cep" class="col-form-label">CEP: {{ dataForm.value }}</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.cep }" id="cep"
                  v-model="dataForm.cep" v-mask="'#####-###'" min="0" required>
                <div class="invalid-feedback">
                  {{ errors.cep }}
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="city" class="col-form-label">Cidade:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.city }" id="city"
                  v-model="dataForm.city">
                <div class="invalid-feedback">
                  {{ errors.city }}
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="street" class="col-form-label">Bairro:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.street }" id="street"
                  v-model="dataForm.street">
                <div class="invalid-feedback">
                  {{ errors.street }}
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="uf" class="col-form-label">Estado:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.uf }" id="uf"
                  v-model="dataForm.uf">
                <div class="invalid-feedback">
                  {{ errors.uf }}
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="complement" class="col-form-label">Complemento:</label>
                <input type="text" class="form-control" id="complement" v-model="dataForm.complement">
              </div>
              <div class="col-md-6 mb-3">
                <label for="neighborhood" class="col-form-label">Lougradouro:</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.neighborhood }" id="neighborhood"
                  v-model="dataForm.neighborhood">
                <div class="invalid-feedback">
                  {{ errors.neighborhood }}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal"> <i class="fa fa-xmark"></i>
            Cancelar</button>
          <button type="button" class="btn btn-primary" @click="update()"> <i class="fa fa-save"></i> Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>