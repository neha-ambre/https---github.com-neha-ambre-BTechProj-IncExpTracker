import react, {useState} from "react";
import LoginContext from "./loginContext";

const LoginState = (props) => {
    const user= {
        "email":"",
        "userid":""
    }

    const [userState,setUserState] = useState(user)
    const [logedIn,setLogedIn] = useState(false)

    return(
        <LoginContext.Provider value ={{userState,logedIn}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginState;