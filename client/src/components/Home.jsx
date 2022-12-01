import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import Feed from "./Feed";
import Header from "./Header";
import Footer from "./Footer";
import Modal from './Modal'
import { motion } from 'framer-motion'


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
      contacts: appState.user.contacts
    })
    // console.log(currentUser);
  }, [appState]);

  const [trans, setTrans] = useState([]);
  const [mode, setMode] = useState({
    display: 'none',
    type: ''
  })

  const getUserTrans = async () => {
    const query = await fetch(`/api/transaction/${appState.user._id}`, {
      method: "GET",
    });
    const response = await query.json();
    setTrans(response);
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      getUserTrans()
    }
  }, [currentUser])



  return (

    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }} >

      <Header currentUser={currentUser} />
      {currentUser && <Modal
        mode={mode}
        setMode={setMode}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />}
      <main style={{ display: "flex", justifyContent: "center" }}>
        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">

          <h6 className="purple-color border-bottom pb-2 mb-0" style={{ textAlign: 'center' }}>My Transactions</h6>
          <div
            className="d-flex text-muted pt-3"
            style={{ border: "black 1px solid", padding: "4%" }}
          >
            {trans && currentUser && <Feed trans={trans} currentUser={currentUser} />}
          </div>
        </div>
      </main>
      <Footer mode={mode} setMode={setMode} />

    </motion.div>
  );
};

export default Home;
