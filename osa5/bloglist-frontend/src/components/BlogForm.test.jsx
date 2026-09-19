import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and call onSubmit', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    const handleTitleChange = vi.fn()
    const handleAuthorChange = vi.fn()
    const handleUrlChange = vi.fn()

    render(<BlogForm handleSubmit={handleSubmit} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />)

    const inputTitle = screen.getByPlaceholderText('title')
    const inputAuthor = screen.getByPlaceholderText('author')
    const inputUrl = screen.getByPlaceholderText('https://url.com')
    const createButton = screen.getByText('create')

    await user.type(inputTitle, 'testing a form...')
    await user.type(inputAuthor, 'vici')
    await user.type(inputUrl, 'https://testing.com')
    await user.click(createButton)

    screen.debug()
    expect(handleSubmit.mock.calls).toHaveLength(1)
    expect(handleTitleChange.mock.calls[0][0].target.value).toBe('testing a form...')
    expect(handleAuthorChange.mock.calls[0][0].target.value).toBe('vici')
    expect(handleUrlChange.mock.calls[0][0].target.value).toBe('https://testing.com')
})