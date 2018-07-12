<template>
  <div class="container row">
    <div class="col-md-10">LOL</div>
    <div class="col-md-12">LOL</div>
  </div>
</template>

<script>
import { USER_INFO, API_ROUTE } from '../consts/apiRouts';
    export default {
      name: "Profile",
      data() {
        return {
          userStatus: null,
          name: null,
          surname: null,
          email: null
        }
      },
      mounted: function () {
        let username = this.$router.history.current.path;
        this.$http.get(API_ROUTE + 'user' + username).then(res => {
          console.log(res);
          this.name = res.body.name;
          this.surname = res.body.surname;
          this.email = res.body.email;
        });
      },
    }
</script>

<style scoped>

</style>
