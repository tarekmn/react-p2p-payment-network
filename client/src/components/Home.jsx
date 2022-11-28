import { useEffect, useState } from "react";
import { useAppContext } from "../utils/AppContext";
import Feed from "./Feed";

const Home = (props) => {
  const { appState, lookupUser } = useAppContext();

  useEffect(() => {
    console.log(appState);
    if (!appState || !appState.user) {
      window.location.href = "/login";
    }
  }, [appState]);

  const [newUsers, setNewUsers] = useState([]);
  console.log(props.userData);

  const condenseUsers = () => {
    return props.userData.map((user) => {
      return {
        username: user.username,
        transaction: user.transaction,
      };
    });
  };

  useEffect(() => {
    if (newUsers.length) console.log(newUsers);
  }, [newUsers]);

  useEffect(() => {
    if (props.userData && props.userData.length && !newUsers.length) {
      setNewUsers(condenseUsers());
    }
  }, [props.userData]);

  // console.log(newUsers);

  return (
    <>
      <main style={{display:'flex', justifyContent:'center'}}>
        <div className="my-3 p-3 bg-body bg-light rounded shadow-sm" >
          <h6 className="purple-color border-bottom pb-2 mb-0">Transactions</h6>
            <div className="d-flex text-muted pt-3" >
              <Feed />
            </div>
        </div>
      </main>
    </>
  );
};

export default Home;
