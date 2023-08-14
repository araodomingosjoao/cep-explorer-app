<script setup>
import InputFilter from "@/components/InputFilter.vue";
import AddAddress from "@/components/AddAddress.vue";
import CardAddress from "@/components/CardAddress.vue";
import CardPlaceholder from "@/components/CardPlaceholder.vue";

import { reactive, onMounted, ref, onBeforeUpdate } from "vue";
import { Modal } from "bootstrap";

import axios from "@/helpers/axios";

let addresses = reactive([]);

var editForm = reactive({
  cep: "",
  city: "",
  street: "",
  uf: "",
  neighborhood: "",
});

let myModal = reactive({});

const state = reactive({
  isLoading: false,
  isLoadingForm: false,
});

var errors = reactive({
  cep: "",
  city: "",
  street: "",
  uf: "",
  neighborhood: "",
});

const getAddress = async () => {
  addresses = [];
  state.isLoading = true;
  await axios.get("/v1/address").then((response) => {
    addresses = Object.assign(addresses, response?.data?.data);
    state.isLoading = false;
  });
};

const addressFiltred = async (filterData) => {
  addresses = [];
  state.isLoading = true;
  await axios
    .get(`/v1/address?${filterData.option}=${filterData.search}`)
    .then((response) => {
      console.log(response);
      addresses = Object.assign(addresses, response?.data?.data);
      state.isLoading = false;
    });
};

const update = async () => {
  validate();

  if (
    errors.cep === "" &&
    errors.city === "" &&
    errors.street === "" &&
    errors.uf === "" &&
    errors.neighborhood === ""
  ) {
    state.isLoadingForm = true;
    await axios.put(`/v1/address/${editForm.id}`, editForm).then((response) => {
      console.log(response);
      state.isLoadingForm = false;
      swal("Endereço editado com sucesso", {
        icon: "success",
      }).then((resSwal) => {
        if (resSwal) {
          closeModal();
          getAddress()
        }
      });
    });
  }
};

const openModal = (data) => {
  editForm = Object.assign(editForm, data);
  myModal.show();
};

const closeModal = () => {
  cleanAttribute();
  myModal.hide();
};

const cleanAttributeForm = () => {
  errors.cep = "";
  errors.city = "";
  errors.street = "";
  errors.uf = "";
  errors.neighborhood = "";
};

const cleanAttribute = () => {
  errors.cep = "";
  errors.city = "";
  errors.street = "";
  errors.uf = "";
  errors.neighborhood = "";
  editForm = Object.assign(editForm, errors);
};

const validate = async () => {
  cleanAttributeForm();
  if (editForm.cep === "") {
    errors.cep = "O campo cep é obrigatório";
  }
  const cepPattern = /^\d{5}-\d{3}$/; // Expressão regular para o formato XXXXX-XXX
  if (editForm.cep != "" && !cepPattern.test(editForm.cep)) {
    errors.cep = "O campo cep deve cumprir o formato XXXXX-XXX";
  }
  if (editForm.city === "") {
    errors.city = "O campo cidade é obrigatório.";
  }
  if (editForm.street === "") {
    errors.street = "O campo bairro é obrigatório.";
  }
  if (editForm.uf === "") {
    errors.uf = "O campo uf é obrigatório.";
  }
  if (editForm.neighborhood === "") {
    errors.neighborhood = "O campo lougradouro é obrigatório.";
  }
};

onMounted(async () => {
  await getAddress();
  myModal = new Modal("#editAddressModal");
});
</script>

<template>
  <div class="container mt-5">
    <div class="row mb-5">
      <InputFilter @filter="addressFiltred" />
      <AddAddress @removed="getAddress" />
    </div>
    <div
      class="w-100 d-flex justify-content-center flex-wrap"
      v-if="!state.isLoading"
    >
      <CardAddress
        v-for="(address, index) in addresses"
        :key="index"
        :address="address"
        @removed="getAddress"
        :openModal="openModal"
      />
    </div>
    <div class="w-100 d-flex justify-content-center flex-wrap" v-else>
      <CardPlaceholder v-for="(address, index) in 6" :key="index" />
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="editAddressModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="editAddressModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="editAddressModalLabel">
              Editar Endereço
            </h1>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form class="g-3 needs-validation" novalidate>
              <div class="row">
                <div class="col-md-12 mb-3">
                  <label for="cep" class="col-form-label"
                    >CEP: {{ editForm }}</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.cep }"
                    id="cep"
                    v-model="editForm.cep"
                    v-mask="'#####-###'"
                    min="0"
                    required
                  />
                  <div class="invalid-feedback">
                    {{ errors.cep }}
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="city" class="col-form-label">Cidade:</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.city }"
                    id="city"
                    v-model="editForm.city"
                  />
                  <div class="invalid-feedback">
                    {{ errors.city }}
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="street" class="col-form-label">Bairro:</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.street }"
                    id="street"
                    v-model="editForm.street"
                  />
                  <div class="invalid-feedback">
                    {{ errors.street }}
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="uf" class="col-form-label">Estado:</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.uf }"
                    id="uf"
                    v-model="editForm.uf"
                  />
                  <div class="invalid-feedback">
                    {{ errors.uf }}
                  </div>
                </div>
                <div class="col-md-8 mb-3">
                  <label for="neighborhood" class="col-form-label"
                    >Lougradouro:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.neighborhood }"
                    id="neighborhood"
                    v-model="editForm.neighborhood"
                  />
                  <div class="invalid-feedback">
                    {{ errors.neighborhood }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div v-if="!state.isLoadingForm">
              <button
                type="button"
                class="btn btn-secondary mx-2"
                @click="closeModal"
              >
                <i class="fa fa-xmark"></i> Cancelar
              </button>
              <button type="button" class="btn btn-primary" @click="update()">
                <i class="fa fa-save"></i> Editar
              </button>
            </div>
            <div v-else>
              <button type="button" class="btn btn-secondary mx-2" disabled>
                <i class="fa fa-xmark"></i> Cancelar
              </button>
              <button type="button" class="btn btn-primary disabled" disabled>
                <i class="fa fa-save"></i> Editando...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>