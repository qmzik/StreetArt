<template>
    <div class="row">
        <GalleryItem class="item" date="22.01.2018" title="Исскуство" />
    </div>
</template>

<script>
import GalleryItem from './GalleryItem';

export default {
    name: 'Gallery',
    components: { GalleryItem }
}
</script>

<style scoped>
.item {
    width: 202px
}
</style>
