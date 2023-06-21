const API_URL = 'https://fitnesstrac-kr.herokuapp.com/api'
const LogInForm = ({ token, setToken, username, setUsername, password, setPassword }) => {

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/users/login`, {
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
            console.log(data.token);

            setToken(data.token)

            console.log("token", token);

        }
        catch (error) {
            console.error(error)
        }
    };

    return (
        <div id="login">
            <h2>Log In</h2>
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username"></label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    name="username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
                <label htmlFor="password"></label>
                <input
                    type="text"
                    placeholder="Password"
                    value={password}
                    name="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                <button type="submit">Log In</button>
            </form>
        </div>
    )
};

export default LogInForm;