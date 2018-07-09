<template>

<div>PROFILE!</div>
</template>

<script>
import { USER_INFO } from '../consts/apiRouts';
    export default {
      name: "Profile",
      data() {
        return {
          userStatus: null,
          name: null,
          surname: null
        }
      },
      mounted: function () {
        console.log(this.$router.history.current.path)
        let data = { id: localStorage.id };
        this.$http.post(USER_INFO, data).then(res => {
          if(res.body.token === localStorage.token && res.body._id === localStorage.id) {
            this.userStatus = 'owner';
          } else {
            this.userStatus = 'guest';
          }
          this.name = res.body.name;
          this.surname = res.body.surname;
        }, () => {
            this.$Notify.error({
              title: 'Ошибка',
              message: 'Потеряна свзять с сервером',
            });
        });
      },
    }
</script>

<style scoped>

</style>
