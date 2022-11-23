import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Post from '../components/Post'
import Link from 'next/link'
import PostsLayout from '../components/PostsLayout'

export default function MyPosts() {
  const [myPosts, setMyPosts] = useState([])
  const { data: session } = useSession()

  const getMyPosts = async () => {
    const res = await fetch('/api/myPosts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: session.user.email }),
    })
    const json = await res.json()

    setMyPosts(json)
  }

  useEffect(() => {
    if (session) {
      getMyPosts()
    }
  }, [session])

  return (
    <div className='mb-20'>
      <div className='flex flex-col items-center justify-center py-20 gap-10'>
        <h1 className='text-5xl'>내 게시글</h1>
        <Link
          href='/'
          className='border border-black p-2 w-20 hover:bg-slate-600 hover:text-slate-100 transition duration-100'
        >
          뒤로 가기
        </Link>
      </div>
      <PostsLayout
        posts={myPosts}
        breakPoints={{ 0: 1, 400: 2, 780: 3, 1000: 4, 1200: 5 }}
      />
    </div>
  )
}
