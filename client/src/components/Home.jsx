import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import Feed from "./Feed";
import Header from "./Header";
import Footer from "./Footer";

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
    });
    // console.log(currentUser);
  }, [appState]);

  const [trans, setTrans] = useState();

  const getUserTrans = async () => {
    const query = await fetch(`/api/transaction/${appState.user._id}`, {
      method: "GET",
    });
    const response = await query.json();
    setTrans(response);
  };

  useEffect(() => {
    getUserTrans();
  }, []);

  useEffect(() => {
    console.log(trans);
  }, [trans]);

  return (
    <>
      <Header currentUser={currentUser} />
      <main style={{ display: "flex", justifyContent: "center" }}>
        

        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
          <h6 className="purple-color border-bottom pb-2 mb-0">Transactions</h6>
          <div
            className="d-flex text-muted pt-3"
            style={{ border: "black 1px solid", padding: "4%" }}
          >
            <Feed trans={trans} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
