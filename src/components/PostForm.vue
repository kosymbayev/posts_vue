<template>
    <form @submit.prevent>
        <h4>Создание поста</h4>
        <TheInput 
            v-focus
            v-model="post.title"
            class="input" 
            placeholder="Название поста"
        />
        <TheInput 
            v-model="post.body"
            class="input" 
            placeholder="Описание поста"
        />
        <TheButton
            style="align-self: flex-end; margin-top: 15px;"
            @click="createPost"
        >
            Создать
        </TheButton>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        };
    },
    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                title: '',
                body: '',
            };
        },
    },
}
</script>

<style>
form
{
    display: flex;
    flex-direction: column;
}
</style>