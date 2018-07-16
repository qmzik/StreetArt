<template>
    <div class="row item">
        <img class="col-md-24" src="https://mir-s3-cdn-cf.behance.net/projects/202/2f853b67666571.Y3JvcCwyMjE0LDE3MzEsMCw2MzU.jpg">
        <div class="row col-md-24 item-info">
            <h1 class="col-md-24 item-tittle">{{ title }}</h1>
            <p class="col-md-24">{{ description }}</p>
            <span class="col-md-24 flex-end">{{ date }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GalleryItem',
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: 'Описание отсутствует'
        },
        date: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>


.item {
    box-shadow:8px 8px 15px 4px rgb(190, 176, 176);
    border-bottom: 1px rgb(190, 176, 176) solid;
}

.item-info {
    padding: 10px;
    margin-top: 20px;
}

</style>
