import Image from 'next/image'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { selectedGIF } from '../atoms/selectedGIF'

export default function GifCard({ gif }) {
  const [isLoading, setIsLoading] = useState(true)
  const setSelected = useSetRecoilState(selectedGIF)

  return (
    <div
      onClick={() => setSelected(gif)}
      className='w-full rounded-xl overflow-hidden'
    >
      <Image
        className={`w-full hover:scale-125 transition hover:opacity-90 cursor-pointer duration-300 hover:ring ${
          isLoading ? 'grayscale bg-slate-200 blur' : 'grayscale-0'
        }`}
        src={gif.images.original.webp}
        width={gif.images.original.width}
        height={gif.images.original.height}
        alt='gif'
        loading='lazy'
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}
