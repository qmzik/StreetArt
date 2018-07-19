<template>
    <div class="row user-info">
      <div class="row col-md-24 flex-middle">
          <h1>{{ name }}</h1>
      </div>
      <div class="row col-md-5">
        <div class="photo">
          <img src='http://s4.hostingkartinok.com/uploads/images/2013/12/7f16668ee19e767ca297d66f36084d21.jpg' />
        </div>
      </div>
      <div class="row col-md-12 flex-start">
        <div class="info">
          <p class="specialization">{{ specialization }}</p>
          <p class="location"><i class="icon icon-map-pin"></i> {{ location }}</p>
          <p class="email"><i class="icon icon-mail"></i> {{ email }}</p>
        </div>
      </div>
      <div class="row">
        <div>
          <at-button v-if="userStatus==='owner'" icon="icon-edit-2" type="primary">Редактировать
          </at-button>
          <at-button v-if="userStatus==='guest'" icon="icon-star" type="primary">В избранное
          </at-button>
          <at-button icon="icon-message-square">Написать сообщение</at-button>
        </div>
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
  .specialization {
    font-size: 14px;
    padding-bottom: 8px;
  }
  .email, .location {
    font-size: 13px;
    color: #2b2b2b;
  }
  .photo img {
    width: 110px;
    height: 110px;
    border: 1px solid #ddd;
    border-radius: 50%;
    box-shadow: 0 2px 5px #aaa;
  }
  .site a {
    color: gray;
  }
  .site a:hover {
    color: #535353
  }
  .user-info {
    height: 250px;
  }
</style>
