<template>
    <div class="row">
      <div class="name col-md-24">
        <h2>{{ name }}</h2>
      </div>
      <div class="photo col-md-6">
        <img src='http://s4.hostingkartinok.com/uploads/images/2013/12/7f16668ee19e767ca297d66f36084d21.jpg' />
      </div>
      <div class="info col-md-12">
        <p class="specialization">{{ specialization }}</p>
        <p class="location"><i class="icon icon-map-pin"></i> Местоположение: {{ location }}</p>
        <p class="site"><i class="icon icon-mail"></i> {{ email }}</p>
      </div>
      <div>
        <at-button v-if="userStatus==='owner'" icon="icon-edit-2" type="primary">Редактировать
        </at-button>
        <at-button v-if="userStatus==='guest'" icon="icon-star" type="primary">В избранное
        </at-button>
        <at-button icon="icon-message-square">Написать сообщение</at-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true,
      default: 'Местоположение не указано'
    },
    email: {
      type: String,
      required: true
    },
    userStatus: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
  .info {
    margin-top: 1em;
  }
  .info p {
    text-align: left;
  }
  .photo img {
    width: 125px;
    height: 125px;
    border: 1px solid #ddd;
    border-radius: 50%;
    box-shadow: 0 2px 5px #aaa;
    float: left;
  }
  .site a {
    color: gray;
  }
  .site a:hover {
    color: #535353
  }
  .name {
    text-align: left;
  }
</style>
