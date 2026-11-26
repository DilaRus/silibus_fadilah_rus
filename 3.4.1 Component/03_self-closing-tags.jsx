// ❌ Wrong
// <img src="image.jpg">
// <input type="text">
// <br>

// ✅ Correct
function SelfClosingTags() {
  return (
    <div>
      <img src="/vite.svg" alt="" />
      <input type="text" />
      <br />
    </div>
  )
}
// (the slide uses src="image.jpg"; the image path is changed to /vite.svg so a picture is shown)

export default SelfClosingTags
