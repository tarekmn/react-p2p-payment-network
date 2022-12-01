const Header = (props) => {
  const fetchUser = async () => {
    const query = await fetch("");
    const data = await query.json();
  }

  // useEffect(()=>{
  //     fetchUser()
  // },[])

  return (
    <header>
      <div
        style={{
          margin: "18px auto",
          borderRadius: '20px',
          boxShadow:'0 0 0px',
          width: "300px",
          height: "160px",
          background: "white",
          border: "1px outset black",
          textAlign: "center",

          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          flexWrap:'wrap'
        }}
      >
        {props.currentUser && (
          <div
            style={{
              color: "black",
              fontWeight: "700",
             
            }}
          >
            <h4 className="nopadding" style={{magin:'0px'}}>Welcome {props.currentUser.username}!</h4>
            <div style={{display:'inline-block', width:'65px', height:'6px', background:'#59C738'}}></div>
            <h6>Your current balance is: </h6>
            <h6>{`$` + props.currentUser.balance}</h6>
          </div>
        )}
      </div>
      
    </header>
  );
};

export default Header;
