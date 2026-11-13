import { useParam } from "react-router-dom"

const users = {
    1: { name: "Syazwan", age: 20, status: "Married" },
    2: { name: "Danial", age: 40, status: "Engaged" },
    3: { name: "Dila", age: 38, status: "Taken" },
};

function UseProfile() {
    const { id } = useParam();
    const user = user[id];

    if (!user) return <p> User ndadaaaaaa</p>;

return (
    <>
        <h2> User Profile</h2>
        <p> Name: {user.name}</p>
        <p> Age: {user.age}</p>
        <p> Status: {user.status}</p>
    </>
);
}

export default UseProfile