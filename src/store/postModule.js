import axios from 'axios';

export const postModule = {
    namespaced: true,
    state: () => ({
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
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
        ],
    }),
    getters: 
    {
        sortedPosts(state) {
            return [...state.posts].sort( (post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]) )
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations:
    {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },
    actions: 
    {
        async fetchPosts({state, commit})// Достаю посты
        {
            try
            {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:
                    {
                        _page: state.page,
                        _postsLimit: state.postsLimit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsLimit));
                commit('setPosts', response.data)
            }
            catch (e)
            {
                console.log(e)
                //alert('error in fetchUsers')
            }
            finally
            {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit})// Дополнительные посты
        {
            try
            {
                commit('setPage', state.page += 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:
                    {
                        _page: state.page,
                        _postsLimit: state.postsLimit,
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsLimit));
                commit('setPosts', [...state.posts, ...response.data])
            }
            catch (e)
            {
                console.log(e)
                //alert('error in fetchUsers')
            }
        }
    }
}