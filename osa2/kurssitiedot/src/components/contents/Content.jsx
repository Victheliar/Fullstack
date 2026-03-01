import Part from './Part'

const Content = ({content}) => {
    // console.log({content})
    const parts = [content[0].exercises, content[1].exercises, content[2].exercises]
    const total = parts.reduce( (s, p) => {
        console.log("what is happening", s, p)
        return s + p
    })
    return (
        <div>
            <Part part={content[0]} />
            <Part part={content[1]} />
            <Part part={content[2]} />
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Content