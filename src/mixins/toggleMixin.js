import { mapMutations } from 'vuex';

export default {
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
        ...mapMutations({
            setIsModalVisible: 'post/setIsModalVisible'
        }),
        hideModal()
        {
            this.setIsModalVisible(false)
        }
    },
}