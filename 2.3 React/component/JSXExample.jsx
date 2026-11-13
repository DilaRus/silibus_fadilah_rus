

function JSXExample() {
    const name = "React Developer"
    const isLearning = true
    const skills = ['JavaScript', 'React', 'CSS']

    return (
        <div> {/* single parent element */}
        {/* 1.embedding JavaScript expression */}
        <h1>hello, {name}!</h1>
        
        {/* 2. conditional rendering */}
        <p>{isLearning ? "Currently learning react" : "React expert"}</p>

        {/* 3. using className instead of class */}
        <div className="skill-container">
            <h3>Skills:</h3>
            {/* 4. rendering lists */}
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
        

        {/* 5.Self-closing tags */}
        <img src="/vite.svg" alt="Viye logo"/>
     
        <br />
        <hr />
        </div>
    )
}

export default JSXExample