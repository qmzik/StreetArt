<template>
<div>PROFILE!</div>
</template>

<script>
    export default {
      name: "Profile",
      data() {
        return {
          userStatus: null
        }
      },
      beforeMount: function () {
          this.userStatus = 'owner';
      }
    }
</script>

<style scoped>

</style>
