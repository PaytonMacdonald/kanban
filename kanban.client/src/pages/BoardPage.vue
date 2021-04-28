<!------------------------------------------------------------>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col text-center mb-5">
        <h1>{{ state.board.title }}</h1>
      </div>
    </div>
    <span>Second Row Lists go here</span>
    <div class="row mx-3">
      <ListComponent v-for="list in state.lists" :key="list.id" :list-prop="list" />
    </div>
  </div>
</template>

<!------------------------------------------------------------>
<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'
import { useRoute } from 'vue-router'
import ListComponent from '../components/ListComponent'
import { listsService } from '../services/ListsService'

export default {
  name: 'Board',

  setup() {
    const route = useRoute()
    const state = reactive({
      board: computed(() => AppState.activeBoard),
      lists: computed(() => AppState.lists)
    })
    onMounted(async() => {
      try {
        await boardsService.getBoardById(route.params.id)
        await listsService.getAllLists(route.params.id)
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state
    }
  },
  components: {
    ListComponent
  }
}
</script>

<!------------------------------------------------------------>

<style>

</style>

<!------------------------------------------------------------>
