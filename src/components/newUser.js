const API_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

const NewUser = ({ token, setToken, username, setUsername, password, setPassword }) => {

    const handleNewUserSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: `${username}`,
                    password: `${password}`
                })
            });
            const data = await response.json()
            console.log('data', data)
            setToken(data.token)

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div id="newUser">
            <h2>New Account</h2>
            <form onSubmit={handleNewUserSubmit}>
                <label htmlFor="Username"></label>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    name="username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <label htmlFor="password"></label>
                <input type="text"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                <button type="submit">Create New Account</button>
            </form>
        </div>
    )
};

export default NewUser