<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col text-center text-primary my-5">
        <h1 class="">
          Making Any Evil Plans?
        </h1>
        <img src="../assets/img/super-evil-line.png" alt="EvilDoer Logo" title="fancy title line for header one">
      </div>
    </div>
    <div class="row mb-5 mr-3">
      <div class="col d-flex justify-content-center">
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
            <div class="col">
              <button type="submit" class="btn btn-primary" title="click to add new board">
                +
              </button>
            </div>
          </div>
        </form>
        <!-- ----- -->
      </div>
    </div>
    <div class="row">
      <BoardComponent v-for="board in state.boards" :key="board.id" :board-prop="board" />
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

<style scoped>
h1{
    font-size: 3.25rem;
  font-family: 'Cinzel', serif;
}
img{
  max-width: 90vw;
  display: center;
}

</style>

<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->
