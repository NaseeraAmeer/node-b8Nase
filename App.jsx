import { useState} from "react";
import axios from "axios";

function App() {

  const [pageType, setPageType] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [firtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("")
  const [signUpPassword, setSignUpPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [samePassword, setSamePassword] = useState(false)






  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value)
  }

  const handleFirstName = (e) => {
    e.preventDefault();
    setFirstName(e.target.value)
  }

  const handleLastName = (e) => {
    e.preventDefault();
    setLastName(e.target.value)
  }

  const handleSignUpEmail = (e) => {
    e.preventDefault();
    setSignUpEmail(e.target.value)
  }

  const handleSignUpPassword = (e) => {
    e.preventDefault();
    setSignUpPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
    if(signUpPassword ===confirmPassword){
      setSamePassword(true);
    }else{
      setSamePassword(false);
    }
  }

  const handleSignUpSummit = (e) => {
    e.preventDefault();
   axios.post("http://localhost:4000/signup",{
    firtName,
    lastName,
    email:signUpEmail,
    password:signUpPassword})
  }

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  const submitLogin = (e) => {
    e.preventDefault();

    console.log(email, password);
    axios
      .post("http://localhost:4000/login", {
        email, password
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.message === "Login success!") {
          setUser(result.data.user)
          setIsLoggedIn(true);

        }

      })
      .catch(err => {
        console.log("error from axios,error");
        setIsLoggedIn(false);
        setErrorMsg(err.response.data.message);
      })

  };
  return (
    <>
      {pageType === "login" ?

        (<>



          {isloggedIn ? (
            <>

              <h1 style={{ color: "blue" }}>Login success! Hello{user.name}</h1> :
              <div style={{ border: "solid black 2px" }}>
                <h2>Role:{user.role}</h2>
                <h4>Employee code:{user.employeeCode}</h4>
              </div>
            </>
          ) : (
            <form>

              <h1>Login</h1>
              <div>
                <label> Username:</label>
                <input type="email" onChange={handleEmail} />
              </div>
              <div>
                <label> Password:</label>
                <input type="password" onChange={handlePassword} />
              </div>{errorMsg && <div style={{ fontSize: "0.8", color: "red" }}>{errorMsg}</div>}
              <button onClick={submitLogin}>Login</button>
              <div>
                Not Signed up yet?<a onClick={()=>{setPageType("signup")}} href= "a"> Click here to Register account </a>
                </div>
              
            </form>

          )}


        </>
        ) : (
          <div>
            <h1>signup</h1>
            <form>

              <div>
                <label>First Name:</label>
                <input type="text" onChange={handleFirstName} />
              </div>

              <div>
                <label>Last Name:</label>
                <input type="text" onChange={handleLastName} />
              </div>

              <div>
                <label>Email:</label>
                <input type="email" onChange={handleSignUpEmail}></input>
              </div>

              <div>
                <label>Password:</label>
                <input type="Password" onChange={handleSignUpPassword}></input>
              </div>


              <div>
                <label>Confirm Password:</label>
                <input type="Password" onChange={handleConfirmPassword} style={{border :`1px ${samePassword? "green":"red"} solid`}} ></input>
                {samePassword?<></>:<div style ={{color:"red"}}>Passwprds do not match</div>}
              </div>
              <button disabled={! (firtName&&lastName&&signUpEmail&&signUpPassword&&confirmPassword)} onClick={handleSignUpSummit}>Signup</button>
              <div>
                Have an account already?<a onClick={() => { setPageType("login") }} href="a">Click here to login</a>
              </div>


            </form>
          </div>
        )}

    </>








  );






}
export default App