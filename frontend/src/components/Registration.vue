<template>
  <div class="row registration">
    <form class="col-xs-8 col-md-8 flex-center col-xs-offset-10 col-md-offset-10">
      <div class="row input-field">
        <label class="col-md-24 col-xs-24">Имя</label>
        <AtInput v-model="firstName" class="col-xs-15 col-md-15" placeholder="Иван"/>
        <HelpIcon class="helpIcon" :empty="!firstName" :correct="isFirstNameCorrect" :incorrect="!isFirstNameCorrect" hint="Пример: Иван"/>
      </div>
      <div class="row input-field">
        <label class="col-md-24 col-xs-24">Фамилия</label>
        <AtInput v-model="secondName" class="col-xs-15 col-md-15" placeholder="Иванов"/>
        <HelpIcon class="helpIcon" :empty="!secondName" :correct="isSecondNameCorrect" :incorrect="!isSecondNameCorrect" hint="Пример: Иванов"/>
      </div>
      <div class="row input-field">
        <label class="col-md-24 col-xs-24">E-mail</label>
        <AtInput v-model="email" class="col-xs-15 col-md-15" placeholder="E-mail"/>
        <HelpIcon class="helpIcon" :empty="!email" :correct="isEmailValid" :incorrect="!isEmailValid" hint="Пример: example@gmail.com"/>
      </div>
      <div class="row input-field">
        <label class="col-md-24 col-xs-24">Пароль</label>
        <AtInput type="password" v-model="password" class="col-xs-15 col-md-15" placeholder="Пароль"/>
        <HelpIcon class="helpIcon" :empty="!password" :correct="isPasswordValid" :incorrect="!isPasswordValid" hint="Должен содержать более 8 символов, хотя бы одну строчную букву, одну прописную букву и одну цифру"/>
      </div>
      <div class="row input-field">
        <label class="col-xs-19 col-md-19">Я прочитал и согласен со всеми правилами</label>
        <at-checkbox v-model="isUserAgreeWithRules" class="col-xs-2 col-md-2"></at-checkbox>
      </div>
      <div class="row flex-start">
        <AtButton type="submit" @click="SendData" :disabled="!isAllCorrect">Зарегистрироваться</AtButton>
        <AtButton @click="BackToMain">На главную</AtButton>
      </div>
    </form>
  </div>
</template>

<script>
    import HelpIcon from "./HelpIcon";
    import { NAME_REGEXP, PASSWORD_REGEXP, EMAIL_REGEXP} from "../consts/regexps";
    import md5 from 'md5';
    import {API_ROUTE} from "../consts/apiRouts";

    export default {
        name: "Registration",
      components: {HelpIcon},
      data() {
          return {
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            passwordHash: '',
            isUserAgreeWithRules: false
          }
      },
      computed: {
        isFirstNameCorrect: function () {
          return NAME_REGEXP.test(this.firstName)
        },
        isSecondNameCorrect: function () {
          return NAME_REGEXP.test(this.secondName)
        },
        isEmailValid: function() {
          return EMAIL_REGEXP.test(this.email)
        },
        isPasswordValid: function() {
          return this.password.length > 8 && PASSWORD_REGEXP.test(this.password);
        },
        isAllCorrect: function () {
          return this.isPasswordValid && this.isEmailValid && this.isUserAgreeWithRules && this.isFirstNameCorrect && this.isSecondNameCorrect;
        },
        passwordHash: function () {
          return md5(this.password);
        }
      },
      methods: {
        SendData: function () {
          let data = { firstName: this.firstName, secondName: this.secondName, email: this.email, passwh: this.passwordHash };
          this.$http.post(API_ROUTE + 'user/signup', data).then(res => {
            this.$Notify.success({
              title: "Успех",
              message: 'Вы были успешно зарегистрированы!'
            });
            this.BackToMain();
            }, () => {
            this.$Notify.error({
              title: "Ошибка",
              message: 'Такой E-mail уже зарегистрирован',
            });
          });
        },
        BackToMain: function() {
          this.$router.push('Main')
        }
      },
      watch: {
        firstName: function () {
          this.firstName ? this.firstName = this.firstName[0].toUpperCase() + this.firstName.slice(1) : null;
        },
        secondName: function () {
          this.secondName ? this.secondName = this.secondName[0].toUpperCase() + this.secondName.slice(1) : null;
        }
      }
    }
</script>

<style scoped>
  .input-field {
    margin-top: 30px;
  }
  label {
    text-align: left;
    font-weight: bold;
  }

  .helpIcon {
    margin-left: 10px;
  }
</style>
