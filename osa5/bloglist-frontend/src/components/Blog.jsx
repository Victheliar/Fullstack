import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async event => {
    event.preventDefault()
    const likes = blog.likes + 1
    const user = blog.user.id
    const author = blog.author
    const title = blog.title
    const url = blog.url

    // console.log(blog)
    await blogService.update(blog.id, { author, likes, title, url, user })
    setLikes(likes)
  }

  if (view === false) {
    return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setView(!view)}>view</button>
      </div>
    </div>
  )}

  if (view === true) {
    // console.log(blog.user.username)
    return (
    <div style={blogStyle}>
    <div>
      {blog.title} {blog.author} <button onClick={() => setView(!view)}>hide</button>
      <br></br>
      {blog.url}
      <br></br>
      likes {likes} <button onClick={handleLike}>like</button>
      <br></br>
      {blog.user.username}
    </div>
  </div>
  )}
}

export default Blog