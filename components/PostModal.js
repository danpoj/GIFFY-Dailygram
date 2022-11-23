import Image from 'next/image'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isPostModalState, selectedPostState } from '../atoms/selectedPost'

export default function PostModal() {
  const setIsPostModal = useSetRecoilState(isPostModalState)
  const post = useRecoilValue(selectedPostState)

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
      <div className='flex flex-col h-[80%] md:flex-row w-[86%] md:w-[70%] md:h-[70%]  rounded overflow-hidden justify-center'>
        <div className='w-full max-h-[60%] md:max-h-max md:w-[40%] bg-black'>
          <Image
            className='object-contain w-full h-full'
            src={post.gif}
            width={post.width}
            height={post.height}
            alt='post gif'
          />
        </div>
        <div className='w-full md:w-[60%] bg-white p-3 flex flex-col justify-between'>
          {/* 포스트 작성자 정보 */}
          <div className='flex flex-col border-b pb-3 border-slate-300'>
            <div className='flex gap-1 border-b border-stone-300 pb-2 items-center'>
              <Image
                className='rounded w-[28px] h-[28px]'
                src={post.author.image}
                width={28}
                height={28}
                alt='post author image'
              />
              <p className='text-sm font-bold'>{post.author.name}</p>
            </div>

            {/* 제목 */}
            <p className='font-extrabold'>{post.title}</p>

            {/* 내용 */}
            <p className='text-sm'>{post.text}</p>
          </div>

          {/* 댓글 */}

          {/* 댓글 입력 input, 좋아요 button */}
          <input
            className='w-full h-12 border rounded border-stone-400 pl-4 text-sm'
            placeholder='댓글'
            type='text'
          />
        </div>
      </div>
    </div>
  )
}
