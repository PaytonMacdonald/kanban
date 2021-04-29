<!------------------------------------------------------------>

<template>
  <div class="row">
    <div class="col-4">
      <div class="card p-3 my-3 bg-dark">
        <div class="row">
          <div class="col">
            <router-link :to="{name: 'Board', params: {id: boardProp.id}}">
              <h3>
                {{ boardProp.title }}
              </h3>
            </router-link>
          </div>
          <div class="col">
            <button type="button" class="btn btn-secondary" @click="deleteBoard(boardProp.id)">
              delete
            </button>
          </div>
        </div>
        <!-- EDIT MODAL -->
        <div class="row">
          <p class="mt-5">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" :data-target="`#boardModal${boardProp.id}`">
              Edit Profile
            </button>
          </p>

          <!-- Modal -->
          <div class="modal fade"
               :id="`boardModal${boardProp.id}`"
               tabindex="-1"
               role="dialog"
               aria-labelledby="exampleModalLabel"
               aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Edit {{ boardProp.title }}
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <!-- FORM -->
                  <form @submit.prevent="editBoard">
                    <div class="form-group">
                      <label class="sr-only" for="boardName"></label>
                      <input type="text"
                             class="form-control"
                             id="boardName"
                             placeholder="Enter New Name"
                             v-model="state.newBoardName.title"
                      >
                    </div>

                    <button type="submit" class="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
                <!-- ---------- -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!------------------------------------------------------------>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { boardsService } from '../services/BoardsService'
import Notification from '../utils/Notification'

export default {
  name: 'Board',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      boards: computed(() => AppState.boards),
      newBoardName: {}
    })
    return {
      state,
      async deleteBoard(id) {
        try {
          if (await Notification.confirmAction('what are you DOING!?')) {
            await boardsService.deleteBoard(id)
            await boardsService.getAllBoards()
            Notification.toast('Board Deleted', 'success')
          }
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      },
      async editBoard() {
        try {
          await boardsService.editBoard(state.newBoardName, props.boardProp.id)
          state.newBoardName = {}
          Notification.toast('Board Updated!', 'success')
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  }

}
</script>

<!------------------------------------------------------------>

<style scoped lang="css">
h3{
  outline: 1rem;
  outline-color: white;
  margin: 0;
  padding: 0;
}
</style>

<!------------------------------------------------------------>
