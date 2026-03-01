import Part from './Part'

const Content = ({content}) => {
    // console.log({content})
    return (
        <div>
            <Part part={content[0]} />
            <Part part={content[1]} />
            <Part part={content[2]} />
            <b>total of {content[0].exercises + content[1].exercises + content[2].exercises} exercises</b>
        </div>
    )
}

export default Content