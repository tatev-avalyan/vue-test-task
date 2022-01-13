<template>
  <div class="login-form">
      <h1>Login</h1>
    <b-form>
      <b-form-group
        class="mb-4"
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        class="mb-4"
        id="input-group-1"
        label="Password:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button @click="login()" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$http.auth
        .login(this.form)
        .then(res => {
          this.$store.commit('USER_LOGIN', res.data)
          this.$router.push('/users')
        })
        .catch(() => {
          alert('Invalid credentials!')
        })
    }
  }
}
</script>
