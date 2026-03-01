import Header from './contents/Header'
import Content from './contents/Content'

const Course = ({course}) => {
    return (
        <div>
            <Header header={course.name} />
            <Content content={course.parts} />
        </div>
    )
}

export default Course