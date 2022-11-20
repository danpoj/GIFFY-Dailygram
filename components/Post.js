import Image from 'next/image'
import { useState } from 'react'

export default function Post({ post }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='w-full mb-5 rounded-lg'>
      <Image
        className={`w-full rounded-t-lg ${
          isLoading ? 'grayscale bg-slate-200 blur' : 'grayscale-0'
        }`}
        src={post.images.original.webp}
        width={post.images.original.width}
        height={post.images.original.height}
        alt='gif'
        loading='lazy'
        onLoadingComplete={() => setIsLoading(false)}
      />
      <p className='border-b border-stone-300 p-3'>{post.title}</p>
    </div>
  )
}
