<!------------------------------------------------------------>

<template>
  <div class="">
    <div class="row">
      <div class="col">
        <div class="card bg-dark mt-4">
          <div class="card-header bg-primary text-white">
            <h5>{{ taskProp.title }}</h5>
          </div>
          <div class="card-body bg-dark">
            <div class="row">
              <div class="col">
                <form @submit.prevent="createComment">
                  <div class="form-row align-items-center">
                    <div class="col-auto">
                      <label class="sr-only" for="inlineFormInput">New Comment</label>
                      <input type="text" class="form-control" id="inlineFormInput" placeholder="Add New Comment" v-model="state.newComment.title">
                    </div>
                    <div class="col-auto">
                      <button type="submit" class="btn btn-secondary" title="click to add a comment">
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
            <div class="row mt-3">
              <div class="col text-left">
                <button type="button" class="btn btn-primary" @click.prevent="deleteTask(taskProp.id)" title="click to delete task">
                  delete
                </button>
              </div>
              <div class="col text-right">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          title="choose a list to move this task to"
                  >
                    Move Task
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#" v-for="list in state.lists" :key="list.id" @click.prevent="moveTask(list.id)">{{ list.title }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO lists need a form to add comments -->
  </div>
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
      lists: computed(() => AppState.lists.filter(l => l.id !== props.taskProp.listId)),
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
          Notification.toast('Comment Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteTask(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this task?')) {
            await tasksService.deleteTask(id)
            await tasksService.getAllTasks(props.taskProp.listId)
            Notification.toast('Task Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      // MOVE TASK FUNCTION ////
      async moveTask(listId) {
        try {
          await tasksService.moveTask(listId, props.taskProp)
          Notification.toast('Task Moved!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
      // ///////////////// //
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
