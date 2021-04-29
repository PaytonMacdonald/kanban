<!------------------------------------------------------------>

<template>
  <div class="row">
    <div class="col">
      <div class="card m-2 p-1">
        <span>{{ commentProp.title }}</span>
        <button type="button" class="btn btn-primary" @click="deleteComment(commentProp.id)">
          delete
        </button>
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
          if (await Notification.confirmAction('what are you DOING!?')) {
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

<style>

</style>

<!------------------------------------------------------------>
