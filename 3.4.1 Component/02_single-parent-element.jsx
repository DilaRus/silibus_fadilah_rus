// The slide shows three versions of the return statement. They are separate components here so the file runs.

// ❌ Wrong - Multiple root elements
// return (
//   <h1>Title</h1>
//   <p>Description</p>
// );

// ✅ Correct - Single parent
function SingleParent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
    </div>
  );
}

// ✅ Also correct - React Fragment
function WithFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}

function SingleParentElement() {
  return (
    <div>
      <SingleParent />
      <WithFragment />
    </div>
  )
}

export default SingleParentElement
