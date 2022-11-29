const Header = (props) => {
  const fetchUser = async () => {
    const query = await fetch("");
    const data = await query.json();
    console.log(data);
  };

  console.log(props.currentUser);

  // useEffect(()=>{
  //     fetchUser()
  // },[])

  return (
    <header style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          margin: "10px auto",
          borderRadius: "50%",
          width: "200px",
          height: "100px",
          background: "#59C738",
          border: "1px outset black",
          textAlign: "center",
          paddingTop: "5%",
        }}
      >
        {props.currentUser && (
          <p
            style={{
              color: "black",
              fontWeight: "800",
              justifyContent: "center",
            }}
          >
            {`$` + props.currentUser.balance}
          </p>
        )}
      </div>
      <div
        style={{
          margin: "10px auto",
          borderRadius: "5%",
          width: "200px",
          height: "100px",
          background: "#59C738",
          border: "1px outset black",
          textAlign: "center",
          paddingTop: "5%",
        }}
      >
        {props.currentUser && (
          <p
            style={{
              color: "black",
              fontWeight: "800",
              justifyContent: "center",
            }}
          >
            {" "}
            Welcome {props.currentUser.username} !{" "}
          </p>
        )}
      </div>
    </header>
  );
};

export default Header;
