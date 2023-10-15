<template>
    <div>
        <h1>Post #{{ $route.params.id }}</h1>
        <div><h3>{{ this.post.title }}</h3></div>
        <div>{{ this.post.body }}</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            post: {},
        }
    },
    methods: 
    {
        async fetchPost(postId)// Достаю пост
        {
            try
            {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params:
                    {
                        id: this.$route.params.id,
                    }
                });
                this.post = response.data[0];
            }
            catch (e)
            {
                alert('error in fetchUsers')
            }
        },
    },
    mounted()
    {
        this.fetchPost();
    },
}
</script>
