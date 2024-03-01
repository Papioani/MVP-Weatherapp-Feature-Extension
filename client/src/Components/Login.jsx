import { useState } from "react";
import axios from "axios"; // axios is a library , cleaner and simpler to the fetch  */

function Login() {
  const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });

  const [data, setData] = useState(null);

  const { username, password } = credentials; /* Destructuring assignment */

  const handleChange = (e) => {
    const { name, value } =
      e.target; /*  e.target represents the DOM element that triggered the event (for example, an input field). */
    setCredentials({
      ...credentials,
      [name]: value,
    }); /* name represents the name attribute, value represents the value that the user has entered. lines 46 & 48 */
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        /* this gets us to ...auth.js line 32 > router.post("/login", async (req, res) => { etc... */
        method: "POST",
        data: credentials, // with fetch we have the json that we need to stringify etc, here we just have the data , and the rest is under the hood
      });

      //store it locally // // cant save in a state the token cause every time you reload , the token will be gone and you ll need to login again
      localStorage.setItem("token", data.token); // setItem is the way to store the token in the localstorage. This is in the browser, dont need library or anything
      console.log(data.message, data.token);
      window.alert("You logged in!");
      setData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setData(false);
    window.alert("You logged out!");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization:
            "Bearer " +
            localStorage.getItem(
              "token"
            ) /* /* with the getItem I access the token stored in the local storage  */,
        },
      });

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 justify-content-center">
          {!data && (
            <button className="btn btn-primary" onClick={login}>
              Log in
            </button>
          )}
          {data && (
            <button className="btn btn-outline-dark ml-2" onClick={logout}>
              Log out
            </button>
          )}
        </div>
      </div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
