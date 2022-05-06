
import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components/index'
import { getPosts } from '../components/services'

const post = [
  {title: 'React Testing', excerpt: 'Learn react testing'},
  {title: 'React Next', excerpt: 'Learn react next'}

]

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
      <div className='lg:col-span-8 col-span-1'>
      {posts.map((post) => (
        <PostCard post={post.node} key={post.node.title}/>
      ))}
      </div>
          <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget/>
            <Categories/>
          </div>
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || []
  return {
    props : {posts}
  }
}

export default Home
