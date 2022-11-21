import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Post from '../components/Post'
import LandingPage from '../components/LandingPage'

const Home = () => {
  const [posts, setPosts] = useState([])

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

  // console.log(posts)

  return (
    <div className='px-1'>
      {/* UPLOAD, LOGIN */}
      <LandingPage />

      {/* HEADER */}
      <h1 className='text-4xl uppercase font-bold mt-32 mb-10 text-center text-stone-700'>
        ALL POSTS
      </h1>

      {/* POSTS */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 0: 1, 400: 2, 780: 3, 1000: 4, 1200: 5 }}
      >
        <Masonry gutter='0.3rem'>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default Home
