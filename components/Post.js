import Image from 'next/image'
import { useState } from 'react'

export default function Post({ post }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='w-full mb-2 rounded border border-stone-400 overflow-hidden'>
      {/* post | gif */}
      <Image
        className={`w-full ${
          isLoading ? 'grayscale bg-slate-200 blur' : 'grayscale-0'
        }`}
        src={post.gif}
        width={post.width}
        height={post.height}
        alt='gif'
        loading='lazy'
        onLoadingComplete={() => setIsLoading(false)}
      />

      {/* post | title, text, author, createdAt  */}
      <div className='px-2 pb-2 pt-1'>
        <p className='font-bold'>{post.title}</p>
        <p className='text-[.9rem]'>{post.text}</p>

        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-1'>
            <Image
              className='w-[24px] h-[24px] object-cover rounded'
              src={post.author.image}
              width={30}
              height={30}
              alt='author image'
            />
            <p className='text-xs font-bold'>{post.author.name}</p>
          </div>
          <p className='text-xs text-stone-500'>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
