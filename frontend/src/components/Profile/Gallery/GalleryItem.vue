<template>
    <div class="row item">
        <img src="../../../assets/test.jpg">
        <div class="row col-md-24 item-info">
            <h1 class="col-md-24 item-tittle">{{ title }}</h1>
            <div class="col-md-24 item-description">{{ normalizeDescription }}</div>
            <span class="col-md-24 flex-end item-date">{{ date }}</span>
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
            default: 'Описание отсутствует',
        },
        date: {
            type: String,
            required: true
        }
    },
    computed: {
        normalizeDescription: function() {
            return this.description.slice(0, 100);
        }
    }
}
</script>

<style scoped>


.item {
    box-shadow:10px 10px 15px 4px rgb(158, 154, 154);
    border-bottom: 1px rgb(190, 176, 176) solid;
    width: 200px;
    height: 300px;
    transition: 0.5s;
    cursor: pointer;
}

.item:hover {
    box-shadow: 15px 15px 15px 4px rgb(190, 176, 176);
}

.item-info {
    padding: 10px;
    width: 100%;
}

.item-date, .item-description, .item-info {
    margin-top: 15px;
}

.item-description {
    width: 80%;
    word-break: break-all;
}
</style>
