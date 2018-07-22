<template>
    <div class="row">
        <AddButton v-if="userStatus === 'owner'"></AddButton>
        <GalleryItem
        class="item"
        date="22.01.2018"
        title="Исскуство"
        description="asssssssssssssssssssssssssssssssssssssssssssssss" />
    </div>
</template>

<script>
import GalleryItem from './GalleryItem';
import AddButton from './AddButton';

export default {
    name: 'Gallery',
    components: { GalleryItem, AddButton },
    props: {
        userStatus: {
            type: String,
            required: true,
            validator: value => ['guest', 'owner'].indexOf(value) !== -1
        }
    }
}
</script>

<style scoped>
.item {
    margin-left: 70px;
}
</style>
