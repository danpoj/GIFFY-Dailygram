import Image from 'next/image'
import Error from 'next/error'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { selectedGIF } from '../atoms/selectedGIF'
import { useSession } from 'next-auth/react'
import PostsLayout from './PostsLayout'

const BASE_URL = 'https://api.giphy.com/v1/gifs/search'

export default function UploadModal({ isUploadModal, setIsUploadModal }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [searched, setSearched] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useRecoilState(selectedGIF)
  const { data: session } = useSession()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(
      `${BASE_URL}?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${e.target[0].value}`
    )

    if (res.ok) {
      const json = await res.json()
      setSearched(json.data)
    } else {
      throw new Error('이미지를 불러오지 못했습니다')
    }

    setLoading(false)
  }

  const clearStates = () => {
    setTitle('')
    setText('')
    setSearched([])
    setSelected(null)
    setIsUploadModal(false)
  }

  const addPost = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session.user.email,
        title,
        text,
        gifData: {
          src: selected.images.original.webp,
          width: parseInt(selected.images.original.width),
          height: parseInt(selected.images.original.height),
        },
      }),
    })

    clearStates()
  }

  const onClick = (e) => {
    if (e.target.id === 'upload-modal') setIsUploadModal(false)
  }

  if (!isUploadModal) return null

  return (
    <div
      onClick={onClick}
      id='upload-modal'
      className='fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center justify-center z-50 bg-stone-900 bg-opacity-90'
    >
      {/* after select GIF */}
      {selected !== null ? (
        <div className='h-[80%] w-[80%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] flex flex-col items-center justify-center gap-1 overflow-y-scroll'>
          <button
            onClick={() => setSelected(null)}
            className=' text-stone-700 py-2 px-4 flex items-center gap-2 bg-white w-[80%] justify-center hover:text-stone-50 hover:bg-stone-700 transition duration-100'
          >
            <span className='text-xl'>&#8592; </span>
            <span className='text-sm font-bold'>뒤로 가기</span>
          </button>
          <Image
            className='max-h-[44%] max-w-[80%] object-contain bg-black'
            src={selected.images.original.webp}
            width={selected.images.original.width}
            height={selected.images.original.height}
            alt='gif'
          />
          <form
            onSubmit={addPost}
            className='flex flex-col w-[80%]  gap-1 font-bold text-lg'
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              className='pl-3 h-12 outline-none'
              type='text'
              placeholder='제목'
              value={title}
            />
            <textarea
              onChange={(e) => setText(e.target.value)}
              value={text}
              className='pl-3 text-base pt-2 h-20 outline-none'
              type='textarea'
              placeholder='내용'
            />
            <button className='text-stone-700 w-full bg-white hover:text-stone-50 hover:bg-stone-700 transition duration-100 text-base py-3'>
              게시
            </button>
          </form>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 h-[70%] md:h-[80%] w-[84%] '>
          <div className='flex justify-center gap-4 px-4'>
            {/* search input */}
            <form onSubmit={onSubmit} className='flex'>
              <input
                className='h-12 w-full md:w-52 lg:w-60 rounded-l-xl border border-r-0 border-stone-400 pl-4 text-lg font-bold outline-none'
                placeholder='지브리...'
                type='text'
              />
              <button
                className='bg-slate-200 h-12 w-16 text-xl border rounded-r-xl border-stone-400'
                type='submit'
              >
                🔍
              </button>
            </form>

            {/* x button */}
            <button
              onClick={() => setIsUploadModal(false)}
              className=' text-3xl font-extrabold text-white hover:text-rose-400'
            >
              &#10005;
            </button>
          </div>

          {/* images */}
          {loading ? (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <Image src='/nyan.gif' alt='loading' width={200} height={200} />
              <p className='font-mono text-lg font-bold'>Loading...</p>
            </div>
          ) : (
            <div className='w-full overflow-y-scroll pl-1 pr-3'>
              {searched === [] ? null : (
                <PostsLayout
                  posts={searched}
                  breakPoints={{ 0: 2, 700: 3, 1100: 4 }}
                  isModal
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* search */}
    </div>
  )
}
