<!------------------------------------------------------------>

<template>
  <!-- TODO lists need a form to add tasks -->
  <div class="col-md-3">
    <div class="card p-3">
      <h4>{{ listProp.title }}</h4>
      <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
    </div>
  </div>
</template>

<!------------------------------------------------------------>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
// import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'
import TaskComponent from '../components/TaskComponent'

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
      tasks: computed(() => AppState.tasks)
    })
    onMounted(async() => {
      try {
        await tasksService.getAllTasks(props.listProp.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state
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
