import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Test Author'
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Component testing is done with react-testing-library Test Author')
    expect(element).toBeDefined()
})