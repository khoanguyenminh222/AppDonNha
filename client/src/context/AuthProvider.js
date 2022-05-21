import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer, { INITIAL_STATE } from "./AuthReducer";


function AuthProvider({children}){
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    return (
        <AuthContext.Provider value={[state, dispatch]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider