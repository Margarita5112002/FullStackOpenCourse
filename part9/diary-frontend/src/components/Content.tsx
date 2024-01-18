import { CoursePart, assertNever } from "../types"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    switch (coursePart.kind) {
        case "basic":
            return <p>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br />
                <i>{coursePart.description}</i>
            </p>
        case "background":
            return <p>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br />
                <i>{coursePart.description}</i>
                <br />
                <span>see more in
                    <a href={coursePart.backgroundMaterial}>{coursePart.backgroundMaterial}</a>
                </span>
            </p>
        case "group":
            return <p>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br />
                <span>project exercises {coursePart.groupProjectCount}</span>
            </p>
        case "requirements":
            return <p>
                <b>{coursePart.name} {coursePart.exerciseCount}</b>
                <br />
                <i>{coursePart.description}</i>
                <br />
                <span>required skills: {coursePart.requirements.join(", ")}</span>
            </p>
        default:
            return assertNever(coursePart);
    }
}

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return courseParts.map(cp =>
        <Part key={cp.name} coursePart={cp} />)
}

export default Content