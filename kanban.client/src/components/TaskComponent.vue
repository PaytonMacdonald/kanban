<!------------------------------------------------------------>

<template>
  <div class="row">
    <div class="col">
      <div class="card p-1">
        <h6>{{ taskProp.title }}</h6>
        <CommentComponent />
      </div>
    </div>
  </div>
  <!-- TODO lists need a form to add comments -->
</template>

<!------------------------------------------------------------>
<script>
import CommentComponent from '../components/CommentComponent'

export default {
  name: 'Task',
  props: {
    taskProp: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentComponent
  }
}
</script>

<!------------------------------------------------------------>

<style>

</style>

<!------------------------------------------------------------>
