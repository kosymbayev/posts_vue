<template>
    <div>
        <h1>Страница с постами</h1>

        <!-- Поиск -->
        <TheInput
            v-focus
            v-model="searchQuery"
            placeholder="Поиск...."
        />

        <div class="app_btns">
            <!-- Создание поста -->
            <TheButton @click="showModal">
                Создать пост
            </TheButton>
            <!-- Сортировка -->
            <TheSelect 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <!-- Модальное окно с созданием постов -->
        <TheModal v-model:show="isModalVisible">
            <PostForm @create="createPost" />
        </TheModal>

        <!-- Список постов --> 
        <PostList 
            :posts="sortedAndSearchedPosts"
            @remove="removePost" 
            v-if="!isPostsLoading"
        />
        <div v-else>Загрузка постов...</div>
        
        <div v-intersection="loadMorePosts" class="observer"></div>
        
        <!-- <div ref="observer" class="observer"></div> -->
        
        <!--
        <div class="page_wrapper">
            <div 
                v-for="pageNumber in totalPage" 
                :key="pageNumber" 
                class="page"
                :class="{
                    'page_current': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div>
        -->
    </div>
</template>

<script>
import axios from 'axios';

import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

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

            page: 1,
            totalPage: 0,
            postsLimit: 10,

            searchQuery: '',
    
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
            ],
        }
    },
    methods: 
    {
        createPost(post)// Создание постов
        {
            this.posts.push(post);
            this.isModalVisible = false;
        },
        removePost(post)// Удаление постов
        {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showModal()// Модальное окно
        {
            this.isModalVisible = true;
        },
        /*
        changePage(pageNumber)// Переключение на другую страницу
        {
            this.page = pageNumber;
        },
        */
        async fetchPosts()// Достаю посты
        {
            try
            {
                this.isPostsLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:
                    {
                        _page: this.page,
                        _postsLimit: this.postsLimit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.postsLimit);
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
        },
        async loadMorePosts()// Дополнительные посты
        {
            try
            {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:
                    {
                        _page: this.page,
                        _postsLimit: this.postsLimit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.postsLimit);
                this.posts = [...this.posts, ...response.data];
            }
            catch (e)
            {
                alert('error in fetchUsers')
            }
        }
    },
    mounted()
    {
        this.fetchPosts();

        /* //Observer
        let options = {
            rootMargin: "0px",
            threshold: 1.0,
        };
        let callback = (entries, observer) => 
        {
            if( entries[0].isIntersecting && this.page < this.totalPage )
            {
                this.loadMorePosts()
            }
        }
        let observer = new IntersectionObserver(callback, options);
        
        observer.observe(this.$refs.observer)
        */

    },
    computed:
    {
        sortedPosts()
        {
            return [...this.posts].sort( (post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]) )
        },
        sortedAndSearchedPosts()
        {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch:
    {
        /*
        page()
        {
            this.fetchPosts();
        }
        */
    }
}
</script>

<style>
.app_btns
{
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
}

/* Pages */
.page_wrapper
{
    display: flex;
    margin-top: 15px;
}
.page
{
    border: 1px solid black;
    padding: 10px;
}
.page_current
{
    border: 2px solid teal;
}

/* */
.observer
{
    height: 30px;
    background: green;
}
</style>