import { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import Post from '../components/Post'
import LandingPage from '../components/LandingPage'

const BASE_URL = 'https://api.giphy.com/v1/gifs/search'

const Home = () => {
  const [posts, setPosts] = useState([])

  const request = async (keyword) => {
    const res = await fetch(
      `${BASE_URL}?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${keyword}`
    )
    if (res.ok) {
      const json = await res.json()
      setPosts(json.data)
    }
  }

  useEffect(() => {
    request('새앙토끼')
  }, [])

  // console.log(posts)

  return (
    <div className='px-1'>
      {/* UPLOAD, LOGIN */}
      <LandingPage />

      {/* HEADER */}
      <h1 className='text-2xl uppercase font-bold my-10 text-center'>
        Lorem ipsum, dolor sit amet consectetur adipisicing
      </h1>

      {/* POSTS */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 0: 1, 400: 2, 780: 3, 1000: 4, 1200: 5 }}
      >
        <Masonry gutter='0.8rem'>
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default Home
