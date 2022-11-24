import { atom } from 'recoil'

const postCommentsState = atom({
  key: 'postComments',
  default: [],
})

export { postCommentsState }
