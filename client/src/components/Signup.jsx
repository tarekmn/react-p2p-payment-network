import { useState } from "react";
import Cookie from "js-cookie";
import { Button, Container, Form } from "react-bootstrap";
import { useAppContext } from "../utils/AppContext";
import { redirect, useNavigate } from "react-router-dom";

const Signup = () => {
  const { appState, setAppState } = useAppContext();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createUser = async (req, res) => {
    const query = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      }),
    });

    console.log(query);
    window.location.href = "/";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);

    createUser();
  };

  return (
    <Container style={{ padding: "50px 200px" }}>
      <Form onSubmit={handleFormSubmit}>
        <div className="d-flex justify-content-center">
          <img
            className="mb-4 center"
            src="logo-no-background.png"
            alt="company logo"
            width="auto"
            height="auto"
          />
        </div>
        <h1>Create a new account!</h1>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder="jdoe@gmail.com"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            name="password"
            placeholder="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button type="submit" variant="primary" size="md">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Signup;
