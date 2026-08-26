import { useState } from 'react'

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
      likes {blog.likes} <button>like</button>
      <br></br>
      {blog.user.username}
    </div>
  </div>
  )}
}

export default Blog