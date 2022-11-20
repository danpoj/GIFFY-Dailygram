import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Image from 'next/image'
import GifCard from './GifCard'
import Error from 'next/error'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedGIF } from '../atoms/selectedGIF'

const BASE_URL = 'https://api.giphy.com/v1/gifs/search'

export default function UploadModal({ isUploadModal, setIsUploadModal }) {
  const [searched, setSearched] = useState([])
  const [loading, setLoading] = useState(false)
  const selected = useRecoilValue(selectedGIF)
  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch(
      `${BASE_URL}?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${e.target[0].value}`
    )
    if (res.ok) {
      const json = await res.json()
      setSearched(json.data)
      setLoading(false)
    }
    setLoading(false)
    throw new Error('??')
  }

  // console.log(selected)

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
        <div className='h-[80%] w-[60%] flex flex-col items-center justify-center gap-2'>
          <Image
            className='w-[60%]'
            src={selected.images.original.webp}
            width={selected.images.original.width}
            height={selected.images.original.height}
            alt='gif'
          />
          <form className='flex flex-col w-[60%] gap-1 font-bold text-lg'>
            <input className='pl-3 h-12' type='text' placeholder='제목' />
            <textarea
              className='pl-3 pt-2'
              type='textarea'
              placeholder='내용'
            />
          </form>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 h-[80%] w-[60%]'>
          {/* search input */}
          <form onSubmit={onSubmit} className='flex'>
            <input
              className='h-12 w-full md:w-52 lg:w-60 rounded-l-xl border border-r-0 border-stone-400 pl-4 text-lg font-bold'
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

          {/* images */}
          {loading ? (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <Image src='/nyan.gif' alt='loading' width={200} height={200} />
              <p className='font-mono text-lg font-bold'>Loading...</p>
            </div>
          ) : (
            <div className='w-full overflow-y-scroll pl-1 pr-3'>
              {searched === [] ? null : (
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 0: 1, 600: 2, 1100: 3, 1700: 4 }}
                >
                  <Masonry gutter='0.2rem'>
                    {searched.map((gif) => (
                      <GifCard key={gif.id} gif={gif} />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              )}
            </div>
          )}
        </div>
      )}

      {/* search */}
    </div>
  )
}
