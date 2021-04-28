<!--sssssssssssssssssssssssssssssssssssssssssssssssssssssss-->

<template>
  <div class="container-fluid">
    <div class="row mb-5 mr-3">
      <div class="col">
        <span>first row</span>
        <br>
        <!-- ADD NEW BOARD (go get a bootstrap) @submit.prevent=""-->
        <form action="">
          <label class="mr-3" for="">ADD A NEW BOARD</label>
          <input class="mr-3" type="text" name="newBoard" id="newBoard"> <!--board state.title inputed here-->
          <button type="submit">
            +
          </button>
        </form>
        <!-- ----- -->
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span>second row</span>
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
      boards: computed(() => AppState.boards)
    })
    onMounted(async() => {
      try {
        await boardsService.getAllBoards()
      } catch (error) {
        Notification.toast('Error:' + error, 'error')
      }
    })
    return {
      state
      // async getAllBoards() {
      //   try {
      //     await boardsService.getAllBoards()
      //     Notification.toast('Boards Rendered', 'success')
      //   } catch (error) {
      //     Notification.toast('Error: ' + error, 'error')
      //   }
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
