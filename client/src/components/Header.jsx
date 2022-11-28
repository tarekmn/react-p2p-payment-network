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
          width: "150px",
          background: "#59C738",
          border: "5px outset orange",
        }}
      >
        {props.currentUser && <p style={{}}>{props.currentUser.balance}</p>}
      </div>
      <div
        style={{
          margin: "10px auto",
          width: "150px",
          background: "#59C738",
          border: "5px outset orange",
        }}
      >
        {props.currentUser && <p>{props.currentUser.username}</p>}
      </div>
    </header>
  );
};

export default Header;
