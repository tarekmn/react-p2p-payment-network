import { useAppContext } from "../utils/AppContext";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const { appState, lookupUser } = useAppContext();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    setCurrentUser({
      id: appState.user._id,
      username: appState.user.username,
      email: appState.user.email,
      transcations: [appState.user.transcation],
      balance: appState.user.balance,
    });
    console.log(currentUser);
  }, [appState]);

  console.log(currentUser);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const query = await fetch(`/api/users/${currentUser.id}`, {
      method: "PUT",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    const response = await query.json();
  };

  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const [isShown, setIsShown] = useState(false);

  return (
    <>
      {currentUser && (
        <section className="" style={{ backgroundColor: "" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className=" col-md-10 col-xl-4">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                        className="rounded-circle img-fluid"
                        style={{ width: "100px" }}
                      />
                    </div>
                    <h4 className="mb-2">{currentUser.username}</h4>
                    <p className="text-muted mb-4">{currentUser.email}</p>
                    <div className="d-flex justify-content-between text-center mt-5 mb-2">
                      <div>
                        <p className="mb-2 h5">{currentUser.balance}</p>
                        <p className="text-muted mb-0">Wallet Balance</p>
                      </div>

                      <div>
                        <p className="mb-2 h5">
                          {currentUser.transcations.length}
                        </p>
                        <p className="text-muted mb-0">Total Transactions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsShown((current) => !current)}
                      type="button"
                      className="btn btn-primary btn-rounded btn-lg"
                    >
                      Update Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isShown && (
            <Form style={{}} onSubmit={handleFormSubmit}>
              <Form.Group style={{ width: "50%", margin: "0 auto" }}>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="John"
                  value={currentUser.username}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group style={{ width: "50%", margin: "0 auto" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="jdoe@gmail.com"
                  value={currentUser.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-6"
                style={{ width: "50%", margin: "0 auto", padding: "5px" }}
              >
                <Button type="submit" variant="primary" size="md">
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </section>
      )}
    </>
  );
};

export default Profile;
