<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'TheButton',
    props: 
    {
        post: 
        {
            type: Object,
            required: true
        }
    }
}
</script>

<style>
.btn
{
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
}
</style>