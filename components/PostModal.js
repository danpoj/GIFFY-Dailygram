import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isPostModalState, selectedPostState } from '../atoms/selectedPost'
import { postCommentsState } from '../atoms/postComments'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function PostModal() {
  const setIsPostModal = useSetRecoilState(isPostModalState)
  const [post, setPost] = useRecoilState(selectedPostState)
  const { data: session } = useSession()

  const onClick = (e) => {
    if (e.target.id === 'post-modal') setIsPostModal(false)
  }

  const reRender = async () => {
    const res = await fetch('api/rerender', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: post.id }),
    })

    const json = await res.json()

    setPost(json)
  }

  useEffect(() => {
    reRender()
  }, [])

  const addComment = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.user.email,
          text: e.target[0].value,
          postId: post.id,
        }),
      })

      reRender()
    } catch (error) {
      console.log(error)
    } finally {
      e.target[0].value = ''
    }
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
      <div className='flex flex-col h-[80%] md:flex-row w-[86%] md:w-[70%] md:h-[70%]   justify-center'>
        <div className='w-full max-h-[30%] md:max-h-max md:w-[40%] bg-black '>
          <Image
            className='object-contain w-full h-full'
            src={post.gif}
            width={post.width}
            height={post.height}
            alt='post gif'
          />
        </div>
        <div className='w-full md:w-[60%] bg-white px-2 pt-3 flex flex-col relative'>
          {/* ????????? ????????? ?????? */}
          <div className='flex flex-col mb-2 border-b border-black pb-4'>
            <div className='flex gap-1  pb-2 items-center'>
              <Image
                className='rounded w-[28px] h-[28px] ring-[2px] ring-fuchsia-500 ring-offset-1 mr-1'
                src={post.author.image}
                width={28}
                height={28}
                alt='post author image'
              />
              <p className='text-xs font-bold truncate max-w-[140px]'>
                {post.author.name} |
              </p>
              <p className='font-extrabold'>{post.title}</p>
            </div>

            {/* ?????? */}
            <div className='flex items-center gap-1'>
              <Image
                className='rounded w-[28px] h-[28px] ring-[2px] ring-fuchsia-500 ring-offset-1 mr-1'
                src={post.author.image}
                width={28}
                height={28}
                alt='post author image'
              />
              <p className='text-xs font-bold truncate max-w-[140px]'>
                {post.author.name} |
              </p>
              <p className='text-sm'>{post.text}</p>
            </div>
          </div>

          {/* ?????? */}
          <div className='flex flex-col gap-3 h-[200px] overflow-y-scroll pb-[3.4rem] md:h-full '>
            {post.Comment.map((comment) => (
              <div className='flex items-center gap-1' key={comment.id}>
                <Image
                  className='w-[24px] h-[24px] rounded-full'
                  src={comment.author.image}
                  alt='comment author image'
                  width={24}
                  height={24}
                />
                <p className='font-bold text-xs max-w-[140px] truncate'>
                  {comment.author.name}
                </p>
                <p className='text-sm'>{comment.text}</p>
              </div>
            ))}
          </div>

          {/* ?????? ?????? input, ????????? button */}
          <form
            onSubmit={addComment}
            className='absolute bottom-0 left-0 right-0'
          >
            <input
              className='w-full h-12 border border-stone-400 pl-4 text-sm outline-none'
              placeholder='??????'
              type='text'
            />
          </form>
        </div>
      </div>
    </div>
  )
}
