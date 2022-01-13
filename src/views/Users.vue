<template>
    <div class="users">
        <b-spinner class="m-5" label="Spinning" v-if="loader"></b-spinner>
        <div v-else>
          <div class="create-user">
            <b-button variant="outline-secondary" @click="$router.push('/')">
                Home
            </b-button>
            <b-button @click="openCreateUserModal()">
                Create User
            </b-button>
        </div>
       <b-table
        class="users-table"
        hover
        :items="users"
        :fields="fields"
        >
            <template #cell(index)="data">
                <span>{{data.index + 1}}</span>
            </template>
           <template #cell(avatar)="data">
               <router-link :to="`users/${data.item.id}`">
                  <img class="avatar" :src="data.value" alt="avatar">
               </router-link>
            </template>
            <template #cell(full_name)="data">
                <router-link :to="`users/${data.item.id}`">
                <span class="full-name">{{data.item.first_name}} {{data.item.last_name}}</span>
                </router-link>
            </template>
            <template #cell(actions)="data">
                <b-button size="sm"  class="mr-1" @click="openUserModal(data.item)">
                    Edit
                </b-button>
                <b-button variant="danger" size="sm" @click="openDeleteModal(data.item)">
                    Delete
                </b-button>
            </template>
       </b-table>
       <b-pagination
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            aria-controls="users"
            align="center"
        ></b-pagination>
        </div>
        <b-modal id="deleteModal" title="Confirm Modal">
          Please confirm that you want to delete User: <b>{{ currentUser.first_name }} {{ currentUser.last_name }}</b>
          <template #modal-footer>
            <b-button variant="outline-secondary" @click="cancel('deleteModal')">
              Cancel
            </b-button>
            <b-button variant="danger" @click="deleteUser()">
              Delete
            </b-button>
          </template>
        </b-modal>
        <b-modal id="userModal" :title="update ? 'Update User' : 'Create User'">
           <b-form>
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
                required
              ></b-form-input>
            </b-form-group>
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
                required
              ></b-form-input>
            </b-form-group>
          </b-form>
          <template #modal-footer>
            <b-button variant="outline-secondary" @click="cancel('userModal')">
              Cancel
            </b-button>
            <b-button variant="secondary" @click="update ? updateUser() : createUser()">
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
      users: [],
      update: false,
      currentPage: 1,
      perPage: 6,
      total: null,
      fields: ['index', 'avatar', 'full_name', 'email', 'actions'],
      currentUser: {}
    }
  },
  created () {
    this.getUsers()
  },
  watch: {
    currentPage () {
      this.getUsers()
    }
  },
  methods: {
    getUsers () {
      const qb = RequestQueryBuilder.create()
      const perPage = this.perPage
      const currentPage = this.currentPage
      qb.setPage(currentPage)
      qb.setLimit(perPage)
      this.$http.users.getAll(qb).then(res => {
        this.users = res.data.data
        this.total = res.data.total
        this.loader = false
      })
    },
    openDeleteModal (currentUser) {
      this.currentUser = currentUser
      this.$bvModal.show('deleteModal')
    },
    deleteUser () {
      this.$http.users.delete(this.currentUser.id).then(() => {
        const index = this.users.findIndex(
          user => user.id === this.currentUser.id
        )
        this.users.splice(index, 1)
        this.$bvModal.hide('deleteModal')
        this.currentUser = {}
      })
    },
    openCreateUserModal () {
      this.update = false
      this.$bvModal.show('userModal')
    },
    createUser () {
      const form = {
        name: this.currentUser.first_name,
        job: this.currentUser.job
      }
      this.$http.users.create(form).then(res => {
        this.$bvModal.hide('userModal')
        this.currentUser = {}
      })
    },
    openUserModal (currentUser) {
      this.update = true
      this.currentUser = currentUser
      this.currentUser.job = 'Leader'
      this.$bvModal.show('userModal')
    },
    updateUser () {
      const form = {
        name: this.currentUser.first_name,
        job: this.currentUser.job
      }
      this.$http.users.update(form, this.currentUser.id).then(() => {
        this.$bvModal.hide('userModal')
        this.currentUser = {}
        this.update = false
      })
    },
    cancel (modal) {
      this.$bvModal.hide(modal)
    }
  }
}
</script>
