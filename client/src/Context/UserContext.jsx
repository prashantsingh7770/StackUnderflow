import { createContext ,useContext} from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  return (
    <UserContext.Provider
    // value={}
    >
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser=()=>{
    return useContext(UserContext);
}

// TODO: user roles ,parseJWT for protected route like admin