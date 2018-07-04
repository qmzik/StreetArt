<template>
  <div class="row auth">
    <form class="col-xs-8 col-md-8 flex-center col-xs-offset-10 col-md-offset-10">
      <InputLine class="input-field" v-model="email" :is-user-text-correct="isEmailValid" hint="Пример: example@gmail.com">
        E-mail
      </InputLine>
      <InputLine class="input-field" type="password" v-model="password" :is-user-text-correct="isPasswordValid"
                 hint="Должен содержать более 8 символов, хотя бы одну строчную букву, одну прописную букву и одну цифру">
        Пароль
      </InputLine>
      <div class="row flex-start">
        <AtButton type="submit" @click="SendData" :disabled="!isAllCorrect">Авторизоваться
        </AtButton>
        <AtButton @click="BackToMain">На главную</AtButton>
      </div>
    </form>
  </div>
</template>

<script>
  import InputLine from './InputLine';
  import HelpIcon from "./HelpIcon";
  import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../consts/regexps";
  import md5 from 'md5';
  import {API_ROUTE} from "../consts/apiRouts";

  export default {
    name: "Auth",
    components: {InputLine, HelpIcon},
    data() {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
      isEmailValid: function () {
        return EMAIL_REGEXP.test(this.email);
      },
      isPasswordValid: function () {
        return this.password.length > 8 && PASSWORD_REGEXP.test(this.password);
      },
      isAllCorrect: function () {
        return this.isPasswordValid && this.isEmailValid;
      },
      passwordHash: function () {
        return md5(this.password)
      }
    },
    methods: {
      SendData: function () {
        let data = { email: this.email, passwh: this.passwordHash };
        this.$http.post(API_ROUTE + 'user/signin', data).then(res => {
          this.$Notify.success({
            title: 'Успех',
            message: 'Вы успешно авторизовались!'
          });
          this.BackToMain();
          }, () => {
          this.$Notify.error({
            title: 'Ошибка',
            message: 'Вы ввели неверный email или пароль'
          });
        });
      },
      BackToMain: function () {
        this.$router.push('Main')
      }
    },
  }
</script>

<style scoped>
  .input-field {
    margin-top: 30px;
  }
</style>

