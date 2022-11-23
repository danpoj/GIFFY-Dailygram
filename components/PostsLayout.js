import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import GifCard from './GifCard'
import Post from './Post'

export default function PostsLayout({ posts, isModal, breakPoints }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={breakPoints}>
      <Masonry gutter='0.2rem'>
        {posts.map((post) =>
          isModal ? (
            <GifCard key={post.id} post={post} />
          ) : (
            <Post key={post.id} post={post} />
          )
        )}
      </Masonry>
    </ResponsiveMasonry>
  )
}
