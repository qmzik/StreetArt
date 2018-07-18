<template>
    <div class="row">
        <div v-if="userStatus === 'owner'" class="add-button item">
            <i class="icon icon-plus"></i>
        </div>
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

.add-button {
    width: 300px;
    height: 400px;
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
