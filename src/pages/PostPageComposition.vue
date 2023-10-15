<template>
    <div>
        <h1>Страница с постами</h1>

        <!-- Поиск -->
        <TheInput
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск...."
        />

        <div class="app_btns">
            <!-- Создание поста -->
            <TheButton @click="showModal">
                Создать пост
            </TheButton>
            <!-- Сортировка -->
            <TheSelect 
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
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
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

export default {
    components: 
    {
        PostForm,
        PostList
    },
    data() {
        return {}
    },
    methods: 
    {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            setPosts: 'post/setPosts',
            setIsModalVisible: 'post/setIsModalVisible'
        }),
        ...mapActions({
            fetchPosts: 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        createPost(post)// Создание постов
        {
            this.setPosts([...this.posts, post]);
            this.setIsModalVisible(false)
        },
        removePost(post)// Удаление постов
        {
            this.setPosts(this.posts.filter(p => p.id !== post.id));
        },
        showModal()// Модальное окно
        {
            this.setIsModalVisible(true)
        },
    },
    computed:
    {
        ...mapState({
            posts: state => state.post.posts,

            isModalVisible: state => state.post.isModalVisible,
            isPostsLoading: state => state.post.isPostsLoading,

            page: state => state.post.page,
            totalPage: state => state.post.totalPage,
            postsLimit: state => state.post.postsLimit,

            searchQuery: state => state.post.searchQuery,

            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        })
    },
    mounted()
    {
        this.fetchPosts();
    },
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