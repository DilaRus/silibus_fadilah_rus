import './PersonalInfo.css'

function PersonalInfo() {
  // Add your variables here
  const name = "Your Name"
  const favoriteLanguage = "JavaScript"
  const hobbies = ["Reading", "Cycling", "Cooking"]
  const now = new Date().toLocaleString()

  return (
    <div className="personal-info">
      {/* Your JSX here */}
      <h1>{name}</h1>
      <p>My favorite programming language is {favoriteLanguage}.</p>

      <h3>Hobbies:</h3>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <p>Current date and time: {now}</p>

      <img src="https://picsum.photos/200" alt="Random from the internet" />
    </div>
  )
}

export default PersonalInfo
