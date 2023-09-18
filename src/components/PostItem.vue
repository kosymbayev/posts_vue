<template>
    <div class="post">
        <div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
        </div>
        <div class="post_btns">
            <TheButton
                @click="$router.push(`/posts/${post.id}`)"
            >Открыть</TheButton>
            <TheButton
                @click="$emit('remove', post)"
            >Удалить</TheButton>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
}
</script>

<style>
.post 
{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
}
</style>