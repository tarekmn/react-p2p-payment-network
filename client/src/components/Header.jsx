const Header = (props) => {
  const fetchUser = async () => {
    const query = await fetch("");
    const data = await query.json();
    console.log(data);
  };

  // console.log(props.currentUser);

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
          textAlignmentsVertical: "bottom",
        }}
      >
        {props.currentUser && (
          <p
            style={{
              color: "white",
              fontWeight: "800",
              textAlignmentsVertical: "center",
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
        }}
      >
        {props.currentUser && <p>{props.currentUser.username}</p>}
      </div>
    </header>
  );
};

export default Header;
