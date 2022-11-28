import { useAppContext } from "../utils/AppContext";
import { useState, useEffect } from "react";

const Profile = () => {
  const { appState, lookupUser } = useAppContext();
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
      <div className="padding">
        <div className="profile-header">
          <div className="d-flex justify-content-center">
            <img
              className="mb-4 mt-4 profile-pic"
              src="tarek.jpg"
              alt="user"
              width="20%"
            />
          </div>
          <div className="container">
            <div className="d-flex justify-content-center">
              <h3 className="m-b-0">Tarek Menesi</h3>
            </div>

            <div className="d-flex justify-content-center">
              <a
                href=""
                className="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded"
                data-id="whatever"
                id="follow"
              >
                X button
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <h6 className="border-bottom pb-2 mt-5" id="post-title">
          Transactions
        </h6>
      </div>
      <div className="mb-3 rounded shadow-sm d-flex justify-content-center">
        <div className="col-sm-12 col-md-6 rounded bg-light shadow-sm">
          <div className="d-flex text-muted pt-3">
            <img
              className="postimg"
              src="/images/arrow.jpg"
              width="32"
              height="32"
            />

            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark"></strong>
              Content
            </p>
          </div>

          <div className="d-flex text-muted pt-3">
            <p className="pb-3 mb-0 small lh-sm border-bottom">
              <strong className="d-block text-gray-dark">
                <a className="purple-color" href="/users/">
                  Wildcard person
                </a>
                said...
              </strong>
              wildcard content
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
