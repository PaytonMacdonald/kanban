<!------------------------------------------------------------>

<template>
  <!-- TODO lists need a form to add tasks -->
  <div class="col-md-4">
    <div class="card p-2 mb-5 bg-secondary">
      <div class="row">
        <div class="col">
          <h2 class="text-white mb-2">
            {{ listProp.title }}
          </h2>
          <form class="mb-3" @submit.prevent="createTask">
            <div class="form-row align-items-center">
              <div class="col-auto">
                <label class="sr-only" for="inlineFormInput">New Task</label>
                <input type="text" class="form-control" id="inlineFormInput" placeholder="Add New Task" v-model="state.newTask.title">
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-primary" title="click to add a task">
                  +
                </button>
              </div>
            </div>
          </form>
          <button type="button" class="btn btn-primary" @click="deleteList(listProp.id)" title="click to delete list">
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
          Notification.toast('Task Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async deleteList(id) {
        try {
          if (await Notification.confirmAction('Are you sure you want to delete this list?')) {
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

<style scoped>
h2{
  font-size: 2.5rem;
  font-family: 'Cinzel', serif;
  }
</style>

<!------------------------------------------------------------>
