<template>
    <div class="app">
        <PostForm @create="createPost" />
        <PostList 
            :posts="posts"
            @remove="removePost" 
        />
    </div>
</template>

<script>
import PostForm from './components/PostForm.vue';
import PostList from './components/PostList.vue';

export default {
    components: 
    {
        PostForm,
        PostList
    },
    data() {
        return {
            posts: 
            [
                {id: 1, title: 'Vue 1', body: 'Описание поста 1'},
                {id: 2, title: 'Vue 2', body: 'Описание поста 2'},
                {id: 3, title: 'Vue 3', body: 'Описание поста 3'},
                {id: 4, title: 'Vue 4', body: 'Описание поста 4'},
            ],
            title: '',
            body: '',

        }
    },
    methods: 
    {
        createPost(post)
        {
            this.posts.push(post);
        },
        removePost(post)
        {
            this.posts = this.posts.filter(p => p.id !== post.id)
        }
    }
}
</script>

<style>
*
{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app
{
    padding: 20px;
}

</style>