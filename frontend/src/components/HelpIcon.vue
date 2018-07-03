<template>
  <at-popover class="at-popover" trigger="hover" :content="hint">
    <i v-if="empty" class="icon icon-help-circle"></i>
    <i v-else-if="correct" class="icon icon-check-circle col-md-2"></i>
    <i v-else="incorrect" class="icon icon-x-circle"></i>
  </at-popover>
</template>

<script>
  export default {
    name: "HelpIcon",
    props: {
      empty: {
        type: Boolean,
        required: true
      },
      correct: {
        type: Boolean,
        required: true
      },
      incorrect: {
        type: Boolean,
        required: true
      },
      hint: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .at-popover {
    font-size: 20px;
  }
  .icon {
    font-size: 25px;
  }
  .icon-help-circle {
    color: #87b1ff;
  }
  .icon-check-circle {
    color: #25ba21;
  }
  .icon-x-circle {
    color: #ff2723;
  }
</style>
