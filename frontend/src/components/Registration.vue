<template>
  <div class="row registration">
    <form class="col-xs-8 col-md-8 flex-center col-xs-offset-10 col-md-offset-10">
      <InputLine class="input-field" v-model="firstName" :is-user-text-correct="isFirstNameCorrect" hint="Пример: Иван">
        Имя
      </InputLine>
      <InputLine class="input-field" v-model="secondName" :is-user-text-correct="isSecondNameCorrect" hint="Пример: Иванов">
        Фамилия
      </InputLine>
      <InputLine class="input-field" v-model="username" :is-user-text-correct="isUsernameCorrect" hint="Пример: user123">
        Username
      </InputLine>
      <InputLine class="input-field" v-model="email" :is-user-text-correct="isEmailValid" hint="Пример: example@gmail.com">
        E-mail
      </InputLine>
      <InputLine class="input-field" type="password" v-model="password" :is-user-text-correct="isPasswordValid" hint="Должен содержать более 8 символов, хотя бы одну строчную букву, одну прописную букву и одну цифру">
        Пароль
      </InputLine>
      <div class="row input-field flex-start">
        <label class="col-xs-15 col-md-15">Я прочитал и согласен со всеми правилами</label>
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
    import { NAME_REGEXP, PASSWORD_REGEXP, EMAIL_REGEXP, USERNAME_REGEXP} from "../consts/regexps";
    import md5 from 'md5';
    import {API_ROUTE, USER_REGISTER} from "../consts/apiRouts";
    import InputLine from "./InputLine";

    export default {
        name: "Registration",
      components: {InputLine, HelpIcon},
      data() {
          return {
            firstName: '',
            secondName: '',
            username: '',
            email: '',
            password: '',
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
        isUsernameCorrect: function () {
          return USERNAME_REGEXP.test(this.username);
        },
        isEmailValid: function() {
          return EMAIL_REGEXP.test(this.email)
        },
        isPasswordValid: function() {
          return this.password.length > 8 && PASSWORD_REGEXP.test(this.password);
        },
        isAllCorrect: function () {
          return this.isPasswordValid && this.isEmailValid && this.isUserAgreeWithRules && this.isFirstNameCorrect && this.isSecondNameCorrect && this.isUsernameCorrect;
        },
        passwordHash: function () {
          return md5(this.password);
        }
      },
      methods: {
        SendData: function () {
          let data = { name: this.firstName, surname: this.secondName, email: this.email, username: this.username, passwh: this.passwordHash };
          this.$http.post(USER_REGISTER, data).then(res => {
            this.$Notify.success({
              title: 'Успех',
              message: 'Вы были успешно зарегистрированы!'
            });
            this.BackToMain();
            }, () => {
            this.$Notify.error({
              title: 'Ошибка',
              message: 'Такой E-mail уже зарегистрирован',
            });
          });
        },
        BackToMain: function() {
          this.$router.push({ name: 'Main' })
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
</style>
