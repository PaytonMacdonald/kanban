import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  // ////////// //
  boards: [],
  activeBoard: {}, // NOTE null or {}???
  lists: [],
  tasks: [], // TODO convert to dictionary {}
  comments: [] // TODO convert to dictionary {} or make it a subdoc to tasks and remove it
})
