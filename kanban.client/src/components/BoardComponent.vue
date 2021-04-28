<!------------------------------------------------------------>

<template>
  <div class="row">
    <div class="col-3">
      <router-link :to="{name: 'Board', params: {id: boardProp.id}}">
        <div class="card p-3 my-3">
          <h3>{{ boardProp.title }}</h3>
        </div>
      </router-link>
    </div>
  </div>
</template>

<!------------------------------------------------------------>

<script>
import { reactive } from 'vue'
// import { AppState } from '../AppState'
// import { boardsService } from '../services/BoardsService'
// import Notification from '../utils/Notification'

export default {
  name: 'Board',
  props: {
    boardProp: {
      type: Object,
      required: true
    }
  },
  setup() {
    const state = reactive({

    })
    return { state }
  }

}
</script>

<!------------------------------------------------------------>

<style>

</style>

<!------------------------------------------------------------>
