<template>
    <section class="row justify-content-between">
        <div class="col-2 ms-3 text-end">
            <img :title="comment.creator.name" :src="comment.creator.picture"
                class="img-fluid comment-pic rounded-circle ms-3" />
        </div>

        <div class="col-9 bg-secondary me-4 px-5 py-3">
            <section class="row">
                <div class="col-10">
                    <h6 class="text-primary">{{ comment.creator.name }}</h6>
                </div>
                <div v-if="account.id == comment.creatorId" class="col-2 text-end">
                    <button @click="removeComment(comment.id)" class="btn">
                        <i title="Delete comment" class="mdi mdi-delete"></i>
                    </button>
                </div>
            </section>

            <p>{{ comment.body }}</p>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js'
export default {
    props: { comment: { type: Object, required: true } },
    setup() {

        return {
            account: computed(() => AppState.account),
            async removeComment(commentId) {
                try {
                    if (await Pop.confirm('Delete comment?', '')) {
                        await commentsService.removeComment(commentId)
                    }
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
.comment-pic {
    width: 17vh;
    height: 17vh;
}
</style>