import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  events: [],
  activeEvent: { coverImg: 'https://www.saeinc.com/wp-content/uploads/2017/11/dark-grey-box.png' },
  tickets: [],
  myTickets: [],
  comments: []
})
