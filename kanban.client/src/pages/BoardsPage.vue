<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->

<template>
  <div class="container-fluid">
    <div class="row mb-5 mr-3">
      <div class="col">
        <br>
        <!-- ADD NEW BOARD (go get a bootstrap) @submit.prevent=""-->
        <form @submit.prevent="createBoard">
          <div class="form-row align-items-center">
            <div class="col-auto">
              <label class="sr-only" for="inlineFormInput">Add New Board</label>
              <input type="text"
                     class="form-control"
                     id="inlineFormInput"
                     placeholder="Add New Board"
                     v-model="state.newBoard.title"
              >
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary">
                +
              </button>
            </div>
          </div>
        </form>
        <!-- ----- -->
      </div>
    </div>
    <div class="row">
      <div class="col">
        <BoardComponent v-for="board in state.boards" :key="board.id" :board-prop="board" />
      </div>
    </div>
  </div>
</template>

<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->

<script>
import BoardComponent from '../components/BoardComponent'
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'Boards',

  setup() {
    const state = reactive({
      boards: computed(() => AppState.boards),
      newBoard: {}
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state,
      async createBoard() {
        try {
          await boardsService.createBoard(state.newBoard)
          state.newBoard = {}
          await boardsService.getAllBoards()
          Notification.toast('Board Created!!!!!!!!!!!!!!!!!!!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {
    BoardComponent
  }
}

</script>

<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->

<style>

</style>

<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->
