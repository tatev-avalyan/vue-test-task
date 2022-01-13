<template>
    <div class="py-5 px-5">
      <b-spinner class="m-5" label="Spinning" v-if="loading"></b-spinner>
      <div v-else>
        <b-button class="mb-5" @click="$router.go(-1)">Go Back</b-button>
      <b-card class="user-avatar mb-3" :img-src="user.avatar" img-alt="avatar" img-left :title="user.first_name + ' ' + user.last_name">
        <b-card-text>
        <b>ID:</b> {{ user.id }}
      </b-card-text>
      <b-card-text>
        <b>Email:</b> {{ user.email }}
      </b-card-text>
    </b-card>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      user: {},
      loading: true
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      const id = this.$route.params.id
      this.$http.users.getById(id).then(res => {
        this.user = res.data.data
        this.loading = false
      })
    }
  }
}
</script>
