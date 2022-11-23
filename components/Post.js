import Image from 'next/image'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { isPostModalState, selectedPostState } from '../atoms/selectedPost'

export default function Post({ post }) {
  const [isLoading, setIsLoading] = useState(true)
  const setSelectedPost = useSetRecoilState(selectedPostState)
  const setIsPostModal = useSetRecoilState(isPostModalState)

  const onPostClick = () => {
    setSelectedPost(post)
    setIsPostModal(true)
  }

  return (
    <div
      onClick={onPostClick}
      className='w-full mb-2 rounded border border-stone-400 overflow-hidden group hover:grayscale transition duration-100 cursor-pointer'
    >
      {/* post | gif */}
      <Image
        className={`w-full -z-20 ${
          isLoading ? 'grayscale bg-slate-700' : 'grayscale-0'
        }`}
        src={post.gif}
        width={post.width}
        height={post.height}
        alt='gif'
        loading='lazy'
        onLoadingComplete={() => setIsLoading(false)}
      />

      {/* post | title, text, author, createdAt  */}
      <div className=' pb-2 pt-1 z-20 group-hover:bg-slate-300 transition duration-100'>
        <p className='font-bold border-b px-2 border-stone-300 py-1'>
          {post.title}
        </p>
        <p className='text-[.8rem] px-2 py-2 leading-5'>{post.text}</p>

        <div className='flex items-center justify-between border-t border-stone-300 pt-2 mt-2 px-2'>
          <div className='flex items-center gap-1'>
            <Image
              className='w-[24px] h-[24px] object-cover rounded'
              src={post.author.image}
              width={30}
              height={30}
              alt='author image'
            />
            <p className='text-[.7rem] leading-3 font-bold'>
              {post.author.name}
            </p>
          </div>
          <p className='text-xs text-stone-500'>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
