<template>
    <div v-if="posts.length > 0">
        <h3>Список постов</h3>
        <transition-group
            name="post-list"
        >
            <PostItem 
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 v-else>
        Список постов пуст
    </h2>
</template>

<script>
import PostItem from '/src/components/PostItem.vue';

export default {
    components: 
    {
        PostItem
    },
    props: 
    {
        posts: 
        {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
.post-list-item 
{
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all .4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(230px);
}

.post-list-move {
  transition: transform .4s ease;
}
</style>