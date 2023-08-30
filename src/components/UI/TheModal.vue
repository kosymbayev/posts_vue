<template>
    <div 
        class="modal"
        v-if="show"
        @click.stop="hideModal"
    >
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheModal',
    props:
    {
        show:
        {
            type: Boolean,
            default: false
        }
    },
    methods:
    {
        hideModal()
        {
            this.$emit('update:show', false);
        }
    }
}
</script>

<style>
.modal
{
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
}
.modal__content
{
    margin: auto;
    background: #fff;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>