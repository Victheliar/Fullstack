import { useState } from 'react'
import blogService from '../services/blogs'
import '../index.css'

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

  const handleRemove = async event => {
    event.preventDefault()
    if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author + '?')) {
      await blogService.remove(blog.id)
    }
  }

  if (view === false) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setView(!view)}>view</button>
        </div>
      </div>
    )}
  // console.log(JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username)
  if (view === true && blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username){
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
          <br></br>
          <button className="remove_button" onClick={handleRemove}>remove</button>
        </div>
      </div>
    )} else {
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