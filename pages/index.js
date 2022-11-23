import { useEffect, useState } from 'react'
import PostsLayout from '../components/PostsLayout'
import LandingPage from '../components/LandingPage'
import Image from 'next/image'
import PostModal from '../components/PostModal'
import { useRecoilValue } from 'recoil'
import { isPostModalState } from '../atoms/selectedPost'

const Home = () => {
  const [posts, setPosts] = useState([])
  const isPostModal = useRecoilValue(isPostModalState)

  // 모달창 외부 scroll lock
  useEffect(() => {
    if (isPostModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isPostModal])

  const getPosts = async () => {
    const res = await fetch('/api/posts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await res.json()

    setPosts(json)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='px-1'>
      {/* UPLOAD, LOGIN */}
      <LandingPage />

      {/* POST MODAL */}
      {isPostModal && <PostModal />}

      {/* HEADER */}
      <h1 className='text-4xl uppercase font-bold mt-32 mb-10 text-center text-stone-700'>
        ALL POSTS
      </h1>

      {/* POSTS */}
      {posts.length === 0 ? (
        <div className='w-screen flex justify-center'>
          <p className='text-lg text-stone-600'>Loading ...</p>
          <Image src='/nyan.gif' alt='loading' width={260} height={100} />
        </div>
      ) : (
        <PostsLayout
          posts={posts}
          breakPoints={{ 0: 1, 400: 2, 780: 3, 1000: 4, 1200: 5 }}
        />
      )}
    </div>
  )
}

export default Home
