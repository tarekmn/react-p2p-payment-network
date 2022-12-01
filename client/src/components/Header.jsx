
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
          alignItems: "center"
          
          
         
        }}
      >
        {props.currentUser && (
          <h5 style= {{
            color: "black",
            fontWeight: "800",
            padding: "35px"
          }}>
            {`$` + props.currentUser.balance}
          </h5>
        )}
      </div>


      <div className="d-flex justify-content-center">
        <img
          className="mb-4 center"
          src="logo-no-background.png"
          alt="company logo"
          width="250px"
          height="100%"
        />
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
          
      
          
        }}
      >
        {props.currentUser && (
          <h5
            style={{
              color: "black",
              fontWeight: "700",
              padding: "20px",
              paddingTop: "35px"
            }}
          >
            Welcome {props.currentUser.username}!
          </h5>
        )}
      </div>
      
    </header>
  );
};

export default Header;
