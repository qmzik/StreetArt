<template>
  <div class="row input-field">
    <label class="col-md-24 col-xs-24"><slot></slot></label>
    <AtInput :type="type" @input.native="handleInput" :value="userText" class="col-xs-15 col-md-15" placeholder="Иван"/>
    <HelpIcon class="helpIcon" :empty="!userText" :correct="isUserTextCorrect" :incorrect="!isUserTextCorrect" :hint="hint"/>
  </div>
</template>

<script>
  import HelpIcon from './HelpIcon';

    export default {
        name: "InputLine",
      components: {HelpIcon},
      model: {
        prop: 'userText',
        event: 'input'
      },
      props: {
          type:{
            type: String,
            default: 'text'
          },
          userText: {
            type: String,
          },
          isUserTextCorrect: {
            type: Boolean,
            required: true
          },
          hint: {
            type: String,
            required: true
          }
      },
      methods: {
          handleInput: function (event) {
            this.$emit('input', event.target.value);
          }
      }
    }
</script>

<style scoped>
  label {
    text-align: left;
    font-weight: bold;
  }

  .helpIcon {
    margin-left: 10px;
  }
</style>
