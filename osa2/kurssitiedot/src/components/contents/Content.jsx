import Part from './Part'

const Content = ({content}) => {
    const parts = content.map(content => content.exercises)
    const total = parts.reduce( (s, p) => {
        // console.log("what is happening", s, p)
        return s + p
    })
    return (
        <div>
                {content.map((content) =>
                    <Part key={content.id} name={content.name} exercises={content.exercises} />
                )}
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Content