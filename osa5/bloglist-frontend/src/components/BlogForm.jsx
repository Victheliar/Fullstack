const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder='title'
          />
        </div>
        <div>
            author:
          <input
            value={author}
            onChange={handleAuthorChange}
            placeholder='author'
          />
        </div>
        <div>
            url:
          <input
            value={url}
            onChange={handleUrlChange}
            placeholder='https://url.com'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm