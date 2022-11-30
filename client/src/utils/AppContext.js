/* eslint-disable react-hooks/exhaustive-deps */
import Cookie from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

const AppProvider = (props) => {
  const [appState, setAppState] = useState({ user: { _id: "6387b91fcd23c70903e1dea3", email: "email@aajaja.com", username: "yfgcfgdycf", balance: 0 } });
  const [appReady, setAppReady] = useState(true)

  const lookupUser = async () => {
    const authCheck = await fetch("/api/users/lookup")
    const checkResult = await authCheck.json()
    console.log(checkResult)
    // if (checkResult && checkResult.result === "success") {
    //   setAppState({ ...appState, user: checkResult.payload })
    //   setAppReady(true)
    // } else {
    //   setAppReady(true)
    // }
  }

  const logout = () => {
    Cookie.remove("auth-token")
    window.location.href = "/login"
  }

  useEffect(() => {
    lookupUser()
  }, [appState])

  return (
    <>
      {appReady === true && (
        <AppContext.Provider value={{ appState, setAppState, logout }}>
          {props.children}
        </AppContext.Provider>
      )}
    </>
  )
}

const AppConsumer = AppContext.Consumer
export { AppContext, AppConsumer, AppProvider }