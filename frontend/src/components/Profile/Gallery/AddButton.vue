<template>
    <div v-if="userStatus === 'owner'" class="add-button item">
        <i class="icon icon-plus"></i>
    </div>
</template>

<script>
export default {
    name: 'AddButton'
}
</script>

<style scoped>

</style>
