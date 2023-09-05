<template>
    <div class="app">
        <h1>Страница с постами</h1>

        <div class="app_btns">
            <TheButton @click="showDialog">
                Создать пост
            </TheButton>
            <TheSelect 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <TheModal v-model:show="isModalVisible">
            <PostForm @create="createPost" />
        </TheModal>

        <PostList 
            :posts="posts"
            @remove="removePost" 
            v-if="!isPostsLoading"
        />
        <div v-else>Загрузка постов</div>
    </div>
</template>

<script>
import axios from 'axios';

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
            posts: [],

            isModalVisible: false,
            isPostsLoading: false,

            selectedSort: '',
            sortOptions:
            [
                {
                    value: 'title',
                    name: 'По названию'
                },
                {
                    value: 'body',
                    name: 'По описанию'
                }
            ]
        }
    },
    methods: 
    {
        createPost(post)
        {
            this.posts.push(post);
            this.isModalVisible = false;
        },
        removePost(post)
        {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog()
        {
            this.isModalVisible = true;
        },
        async fetchPosts()
        {
            try
            {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
                this.posts = response.data;
            }
            catch (e)
            {
                alert('error in fetchUsers')
            }
            finally
            {
                this.isPostsLoading = false;
            }
        }
    },
    mounted()
    {
        this.fetchPosts();
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
.app_btns
{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}
</style>