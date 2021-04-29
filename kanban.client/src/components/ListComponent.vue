<!------------------------------------------------------------>

<template>
  <!-- TODO lists need a form to add tasks -->
  <div class="col-md-3">
    <div class="card p-3 mb-5 bg-secondary">
      <div class="row">
        <div class="col">
          <h4 class="text-white">
            {{ listProp.title }}
            <form @submit.prevent="createTask">
              <div class="form-row align-items-center">
                <div class="col-auto">
                  <label class="sr-only" for="inlineFormInput">New Task</label>
                  <input type="text" class="form-control" id="inlineFormInput" placeholder="Add New Task" v-model="state.newTask.title">
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary">
                    +
                  </button>
                </div>
              </div>
            </form>
          </h4>
          <button type="button" class="btn btn-primary" @click="deleteList(listProp.id)">
            delete
          </button>
        </div>
      </div>
      <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
    </div>
  </div>
</template>

<!------------------------------------------------------------>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
import { tasksService } from '../services/TasksService'
import { listsService } from '../services/ListsService'
import TaskComponent from '../components/TaskComponent'

// import { useRoute } from 'vue-router'

export default {
  name: 'List',
  props: {
    listProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // const route = useRoute()
    const state = reactive({
      tasks: computed(() => AppState.tasks[props.listProp.id]),
      newTask: {}
    })
    onMounted(async() => {
      try {
        await tasksService.getAllTasks(props.listProp.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createTask() {
        try {
          state.newTask.listId = props.listProp.id
          await tasksService.createTask(state.newTask)
          state.newTask = {}
          await tasksService.getAllTasks(props.listProp.id)
          Notification.toast('Task Created!!!!!!!!!!!!!!!!!!!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteList(id) {
        try {
          if (await Notification.confirmAction('what are you DOING!?')) {
            await listsService.deleteList(id)
            await listsService.getAllLists(props.listProp.boardId)
            Notification.toast('List Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {
    TaskComponent
  }
}
</script>

<!------------------------------------------------------------>

<style>

</style>

<!------------------------------------------------------------>
