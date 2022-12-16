<template>
    <form @submit.prevent="createComment" v-if="account.id">
        <textarea v-model="commentReq.body" placeholder="Tell the people..." class="w-100 rounded text-dark p-4"
            rows="3"></textarea>
        <div class="text-end">
            <button class="btn btn-success bg-success mt-3">Submit</button>

        </div>
    </form>
    <form @submit.prevent="createComment" v-else title="Please log in to comment :)">
        <textarea disabled v-model="commentReq.body" placeholder="Please log in to comment"
            class="w-100 rounded text-dark p-4" rows="3"></textarea>
        <div class="text-end">
            <button class="btn btn-success bg-success mt-3" disabled>Submit</button>

        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
export default {
    setup() {
        const commentReq = ref({})
        const route = useRoute()
        return {
            commentReq,
            account: computed(() => AppState.account),
            async createComment() {
                try {

                    logger.log(commentReq.value)
                    commentReq.value.eventId = route.params.eventId
                    logger.log(commentReq.value)
                    await commentsService.createComment(commentReq.value)
                    commentReq.value = {}
                } catch (error) {
                    logger.log(error)
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>

</style>