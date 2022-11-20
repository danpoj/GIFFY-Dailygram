import { atom } from 'recoil'

const selectedGIF = atom({
  key: 'selectedGIF',
  default: null,
})

export { selectedGIF }
