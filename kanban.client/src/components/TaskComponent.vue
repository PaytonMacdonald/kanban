<!------------------------------------------------------------>

<template>
  <div class="">
    <div class="row">
      <div class="col">
        <div class="card bg-dark p-3 my-3">
          <h6 class="text-primary">
            {{ taskProp.title }}
            <button type="button" class="btn btn-primary" @click="deleteTask(taskProp.id)">
              delete
            </button>
          </h6>
          <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
          <div class="row">
            <div class="col">
              <div class="card m-2 p-1 bg-primary">
                <form @submit.prevent="createComment">
                  <div class="form-row align-items-center">
                    <div class="col-auto">
                      <label class="sr-only" for="inlineFormInput">New Comment</label>
                      <input type="text" class="form-control" id="inlineFormInput" placeholder="Add New Comment" v-model="state.newComment.title">
                    </div>
                    <div class="col-auto">
                      <button type="submit" class="btn btn-secondary">
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- TODO lists need a form to add comments -->
</template>

<!------------------------------------------------------------>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { commentsService } from '../services/CommentsService'
import { tasksService } from '../services/TasksService'
import CommentComponent from '../components/CommentComponent'

export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      comments: computed(() => AppState.comments[props.taskProp.id]),
      newComment: {}
    })
    onMounted(async() => {
      try {
        await commentsService.getAllComments(props.taskProp.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createComment() {
        try {
          state.newComment.taskId = props.taskProp.id
          await commentsService.createComment(state.newComment)
          state.newComment = {}
          await commentsService.getAllComments(props.taskProp.id)
          Notification.toast('Comment Created!!!!!!!!!!!!!!!!!!!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteTask(id) {
        try {
          if (await Notification.confirmAction('what are you DOING!?')) {
            await tasksService.deleteTask(id)
            await tasksService.getAllTasks(props.taskProp.listId)
            Notification.toast('Task Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {
    CommentComponent
  }
}
</script>

<!------------------------------------------------------------>

<style>

</style>

<!------------------------------------------------------------>
