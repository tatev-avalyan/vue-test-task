<template>
  <div class="login-form">
    <h1>Login</h1>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form @submit.stop.prevent="handleSubmit(login)" ref="bform">
        <validation-provider
          name="Email"
          :rules="{ required: true, email: true }"
          v-slot="validationContext"
        >
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
              :state="getValidationState(validationContext)"
              aria-describedby="input-1-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="Password"
          :rules="{ required: true }"
          v-slot="validationContext"
        >
          <b-form-group
            class="mb-4"
            id="input-group-2"
            label="Password:"
            label-for="input-1"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              :state="getValidationState(validationContext)"
              aria-describedby="input-2-live-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-2-live-feedback">{{
              validationContext.errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </validation-observer>
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
    getValidationState ({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null
    },
    makeToast (variant, content) {
      this.$bvToast.toast(content, {
        variant: variant,
        solid: true
      })
    },
    login () {
      this.$http.auth
        .login(this.form)
        .then((res) => {
          this.$store.commit('USER_LOGIN', res.data)
          this.$router.push('/users')
        })
        .catch(() => {
          this.makeToast('danger', 'Invalid credentials!')
        })
    }
  }
}
</script>
