<!------------------------------------------------------------>

<template>
  <div class="row">
    <div class="col">
      <div class="card my-3">
        <div class="card-body">
          <p class="card-text">
            <img class="rounded-circle mr-2" :src="commentProp.creator.picture" :alt="commentProp.creator.name" :title="commentProp.creator.name"> {{ commentProp.title }}
          </p>
          <div class="text-right">
            <a href="#" class="card-link" @click.prevent="deleteComment(commentProp.id)" title="click to delete this comment">delete</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'

export default {
  name: 'Comment',
  props: {
    commentProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments)
    })
    onMounted(async() => {
      try {
        await commentsService.getAllComments(props.commentProp.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async deleteComment(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this comment?')) {
            await commentsService.deleteComment(id)
            await commentsService.getAllComments(props.commentProp.taskId)
            Notification.toast('Comment Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }
}
</script>

<!------------------------------------------------------------>

<style scoped>
img{
  width: 2rem
}
.bottom-line{
  border-top-width: 1rem;
  border-top-color: gray;
}
</style>

<!------------------------------------------------------------>
