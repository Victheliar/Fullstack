import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library Test Author')
    expect(element).toBeDefined()
})

test('renders url, likes and user when view button is clicked', async () => {

    window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify({ username: 'testuser', name: 'Test User' })
    )

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Vici',
        url: 'https://yippeee.com',
        likes: 5,
        user: {
            username: 'vici',
            name: 'Viciii'
        }
    }

    render(
        <Blog blog={blog} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlElement = screen.findByText('https://yippeee.com')
    const likesElement = screen.findByText('likes 5')
    const userElement = screen.findByText('vici')
    expect(urlElement).toBeDefined()
    expect(likesElement).toBeDefined()
    expect(userElement).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Vici',
        url: 'https://yippeee.com',
        likes: 5,
        user: {
            username: 'vici',
            name: 'Viciii'
        }
    }
        const mockHandler = vi.fn()

        render(
            <Blog blog={blog} handleLike={mockHandler} />
        )

        const user = userEvent.setup()
        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)
    }
)
