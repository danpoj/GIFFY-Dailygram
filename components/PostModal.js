import Image from 'next/image'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isPostModalState, selectedPostState } from '../atoms/selectedPost'

export default function PostModal() {
  const setIsPostModal = useSetRecoilState(isPostModalState)
  const post = useRecoilValue(selectedPostState)

  console.log(post)

  const onClick = (e) => {
    if (e.target.id === 'post-modal') setIsPostModal(false)
  }

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') setIsPostModal(false)
  })

  return (
    <div
      onClick={onClick}
      id='post-modal'
      className='fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center z-50 bg-stone-900 bg-opacity-50'
    >
      <div className='flex w-[80%] h-[80%] bg-white rounded-xl'>
        <div className='w-[48%] bg-fuchsia-200'>
          <Image
            className='object-contain w-full h-full'
            src={post.gif}
            width={post.width}
            height={post.height}
            alt='post gif'
          />
        </div>
        <div className='w-[52%] bg-slate-200'>
          {/* 포스트 작성자 정보 */}
          <div className='flex gap-1'>
            <Image
              className='rounded w-[28px] h-[28px]'
              src={post.author.image}
              width={28}
              height={28}
              alt='post author image'
            />
            <p>{post.author.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
