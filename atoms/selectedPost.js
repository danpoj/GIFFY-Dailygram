import { atom } from 'recoil'

const selectedPostState = atom({
  key: 'selectedPostState',
  default: null,
})

const isPostModalState = atom({
  key: 'isPostModal',
  default: false,
})

export { selectedPostState, isPostModalState }
