<template>
    <div class="my-5 mx-5">
        <b-button v-if="!$store.state.accessToken" to="/login" class="link" variant="light-outline">
            Login
        </b-button>
        <b-button v-if="$store.state.accessToken" to="/users" class="link" variant="light-outline">
            Users
        </b-button>
        <b-button v-if="$store.state.accessToken" @click="logout()" class="link" variant="light-outline">
            Logout
        </b-button>
        <h1 class="home-body-text">TEST TASK FOR VUE.JS</h1>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$store.commit('USER_LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>
