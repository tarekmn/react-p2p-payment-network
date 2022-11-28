import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
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
    console.log(currentUser);
  }, [appState]);

  return (
    <>
      <Header currentUser={currentUser} />
      <main className="container">
        <div>
          <div className="d-flex justify-content-center">
            <img
              className="m-3"
              src="./logo-no-background.png"
              alt=""
              width="25%"
              height="25%"
            />
          </div>
        </div>
        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm">
          <h6 className="purple-color border-bottom pb-2 mb-0">Transactions</h6>

          <div className="d-flex text-muted pt-3">
            <img className="postimg" src="" width="32" height="32" />
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">
                <a className="purple-color" href="/users/{{post.User.id}}">
                  Tarek{" "}
                </a>
              </strong>
              Transaction
            </p>
          </div>

          {/* <div className="d-flex text-muted pt-3">
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">
                And then
                <a className="purple-color" href="/users/{{comment.User.id}}">
                  commentor
                </a>
                said...
              </strong>
              content
            </p>
          </div> */}

          <div id="commentArea-{{@index}}"></div>
        </div>
      </main>
      <Footer currentUser={currentUser} />
    </>
  );
};

export default Home;
