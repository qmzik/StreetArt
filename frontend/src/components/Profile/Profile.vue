<template>
  <div class="row">
    <UserInfo class="col-md-offset-2 col-md-10" v-bind:name="name + ' ' + surname"
              specialization="Blackbird Illustration"
              location="Ekaterinburg" v-bind:email="email"
              v-bind:user-status="userStatus"/>
    <Gallery class="col-md-12" />
  </div>
</template>

<script>
import { USER_INFO, API_ROUTE, USER_STATUS } from '../../consts/apiRouts';
import Gallery from './Gallery/Gallery';
import UserInfo from './UserInfo';
  export default {
    name: "Profile",
    components: { Gallery, UserInfo },
    data() {
      return {
        userStatus: null,
        name: null,
        surname: null,
        email: null
      }
    },
    created: function() {
      this.fetchUserInfo();
    },
    watch: {
      '$route': function () {
        this.fetchUserInfo();
      }
    },
    methods: {
      fetchUserInfo: function() {
        this.getUserInfo();
        this.getUserStatus();
      },
      getUserInfo: function() {
        let username = this.$router.history.current.path;
        this.$http.get(API_ROUTE + 'user' + username).then(res => {
        console.log(res);
        this.name = res.body.name;
        this.surname = res.body.surname;
        this.email = res.body.email;
        }, err => console.log(err));
      },
      getUserStatus: function () {
        let username = this.$router.history.current.path.slice(1);
        let data = { username, token: localStorage.token, _id: localStorage.id};
        this.$http.post(USER_STATUS, data).then(res => {
          this.userStatus = res.body.status;
        }, err => console.log(err))
      }
    },
  }
</script>

<style scoped>

</style>
