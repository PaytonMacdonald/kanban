<!------------------------------------------------------------>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col text-center mt-4 mb-5 text-primary">
        <h1 class="">
          {{ state.board.title }}
        </h1>
        <img src="../assets/img/super-evil-line.png" alt="EvilDoer Logo" title="fancy header line">
      </div>
    </div>
    <div class="row mb-5">
      <div class="col d-flex justify-content-center">
        <!-- add list -->
        <form @submit.prevent="createList">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only" for="inlineFormInput">New List</label>
              <input type="text" class="form-control" id="inlineFormInput" placeholder="Add New List" v-model="state.newList.title">
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary" title="click to add a list">
                +
              </button>
            </div>
          </div>
        </form>
        <!-- ----- -->
      </div>
    </div>
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
      lists: computed(() => AppState.lists),
      newList: {}
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
      state,
      async createList() {
        try {
          state.newList.boardId = route.params.id
          await listsService.createList(state.newList)
          state.newList = {}
          await listsService.getAllLists(route.params.id)
          Notification.toast('List Created!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }

    }
  },
  components: {
    ListComponent
  }
}
</script>

<!------------------------------------------------------------>

<style scoped>
h1 {
  font-size: 4rem;
  font-family: 'Cinzel', serif;
}
img{
  max-width: 90vw;
  display: center;
}
</style>

<!------------------------------------------------------------>
