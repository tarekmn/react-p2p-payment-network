import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import Feed from "./Feed";
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { motion } from "framer-motion";
const Home = (props) => {
  const { appState } = useAppContext();
  useEffect(() => {
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    setCurrentUser({
      id: appState.user._id,
      username: appState.user.username,
      balance: appState.user.balance,
      contacts: appState.user.contacts,
      transactions: appState.user.transactions,
      image: appState.user.image,
    });
    // console.log(currentUser);
  }, [appState]);
  console.log(appState);
  const [mode, setMode] = useState({
    display: "none",
    type: "",
  });
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Header currentUser={currentUser} />
      {currentUser && (
        <Modal
          mode={mode}
          setMode={setMode}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      <main style={{}}>
        <div
          className=" bg-light rounded  bg-dark card"
          style={{
            padding: "5px",
            margin: "10px auto",
            maxWidth: "50rem",
            height: "auto",
          }}
        >
          <div
            className="card-header"
            style={{ textAlign: "center", color: "white" }}
          >
            My Transactions
          </div>
          <div className="" style={{ padding: "4%" }}>
            {currentUser && (
              <Feed currentUser={currentUser} setCurrentUser={setCurrentUser} />
            )}
          </div>
        </div>
      </main>
      <Footer mode={mode} setMode={setMode} />
    </motion.div>
  );
};
export default Home;
