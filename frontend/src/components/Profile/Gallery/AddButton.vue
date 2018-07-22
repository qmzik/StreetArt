<template>
  <div class="add-button" @click="showModal = true">
    <i class="icon icon-plus"></i>
    <AtModal v-model="showModal" title="Создание проекта">
      <div class="row">
        <InputLine
          :userText="title"
          :is-user-text-correct="isTitleValid"
          hint="Не более 20 символов">
          Название проекта
        </InputLine>
        <AtTextarea v-model="description" class="col-md-24 col-sm-24"></AtTextarea>
      </div>
    </AtModal>
  </div>
</template>

<script>
import InputLine from '../../InputLine'
export default {
    name: 'AddButton',
  components: {InputLine},
  data() {
      return {
        showModal: false,
        title: '',
        description: ''
      }
    },
  computed: {
    isTitleValid: function () {
      return this.title <= 20;
    }
  },
    methods: {
      onSubmit: function () {
        this.showModal = false;
      }
    }
}
</script>

<style scoped>
  .add-button {
    width: 200px;
    height: 300px;
    border-bottom: 1px rgb(190, 176, 176) solid;
    box-shadow:10px 10px 15px 4px rgb(158, 154, 154);
    transition: 0.5s;
    cursor: pointer;
    background-color: rgb(248, 248, 248);
  }

  .add-button:hover {
    box-shadow: 15px 15px 15px 4px rgb(190, 176, 176);
  }

  .icon-plus {
    font-size: 50px;
    opacity: .5;
    color: rgb(158, 154, 154);
    position: relative;
    top: calc(50% - 50px / 2);
  }
</style>
