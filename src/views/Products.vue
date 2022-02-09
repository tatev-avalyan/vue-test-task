<template>
  <div class="products">
    <b-spinner class="m-5" label="Spinning" v-if="loader"></b-spinner>
    <div v-else>
      <div class="create-user">
        <b-button variant="outline-secondary" @click="$router.push('/')">
          Home
        </b-button>
      </div>
      <b-table class="products-table" hover :items="products" :fields="fields">
        <template #cell(index)="data">
          <span>{{ data.index + 1 }}</span>
        </template>
        <template #cell(avatar)="data">
          <router-link :to="`products/${data.item.id}`">
            <img class="avatar" :src="data.value" alt="avatar" />
          </router-link>
        </template>
        <template #cell(full_name)="data">
          <router-link :to="`products/${data.item.id}`">
            <span class="full-name"
              >{{ data.item.first_name }} {{ data.item.last_name }}</span
            >
          </router-link>
        </template>
        <template #cell(actions)="data">
          <b-button size="sm" class="mr-1" @click="openProductModal(data.item)">
            Edit
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        aria-controls="products"
        align="center"
      ></b-pagination>
    </div>
    <b-modal id="deleteModal" title="Confirm Modal">
      Please confirm that you want to delete User:
      <b>{{ currentUser.first_name }} {{ currentUser.last_name }}</b>
      <template #modal-footer>
        <b-button variant="outline-secondary" @click="cancel('deleteModal')">
          Cancel
        </b-button>
        <b-button variant="danger" @click="deleteUser()"> Delete </b-button>
      </template>
    </b-modal>

    <b-modal id="userModal" :title="update ? 'Update User' : 'Create User'">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form
          @submit.stop.prevent="handleSubmit(update ? updateUser : createUser)"
          ref="bform"
        >
          <validation-provider
            name="Name"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              class="mb-4"
              id="input-group-1"
              label="Name"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="currentUser.first_name"
                type="text"
                placeholder="Name"
                :state="getValidationState(validationContext)"
                aria-describedby="input-1-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-1-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="Job"
            :rules="{ required: true }"
            v-slot="validationContext"
          >
            <b-form-group
              class="mb-4"
              id="input-group-1"
              label="Job"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="currentUser.job"
                type="text"
                placeholder="Job"
                :state="getValidationState(validationContext)"
                aria-describedby="input-2-live-feedback"
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-live-feedback">{{
                validationContext.errors[0]
              }}</b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <button ref="bformsubmit" class="d-none" type="submit"></button>
        </b-form>
      </validation-observer>
      <template #modal-footer>
        <b-button variant="outline-secondary" @click="cancel('userModal')">
          Cancel
        </b-button>
        <b-button variant="secondary" @click="$refs['bformsubmit'].click()">
          {{ update ? 'Edit' : 'Create' }}
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { RequestQueryBuilder } from '@nestjsx/crud-request'

export default {
  data () {
    return {
      loader: true,
      products: [],
      currentPage: 1,
      perPage: 6,
      total: null,
      fields: ['name', 'image', 'price', 'actions'],
      product: {
        first_name: '',
        job: ''
      }
    }
  },
  created () {
    this.getproducts()
  },
  watch: {
    currentPage () {
      this.getproducts()
    }
  },

  methods: {
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    getproducts () {
      const qb = RequestQueryBuilder.create()
      const perPage = this.perPage
      const currentPage = this.currentPage
      qb.setPage(currentPage)
      qb.setLimit(perPage)
      this.$http.products.getAll(qb).then((res) => {
        this.products = res.data.data
        this.total = res.data.total
        this.loader = false
      })
    },
    openProductModal (product) {
      this.product = product
      this.$bvModal.show('userModal')
    },
    cancel (modal) {
      this.$bvModal.hide(modal)
    },
    makeToast (variant, content) {
      this.$bvToast.toast(content, {
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
