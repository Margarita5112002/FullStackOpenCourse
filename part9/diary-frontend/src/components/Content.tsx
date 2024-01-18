interface ContentProps {
    courseParts: {
        name: string,
        exerciseCount: number
    }[]
}

const Content = ({ courseParts }: ContentProps) => {
    return courseParts.map(cp => 
        <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>)
}

export default Content