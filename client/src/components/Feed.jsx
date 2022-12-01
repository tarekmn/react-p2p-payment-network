import InfiniteScroll from "react-infinite-scroll-component";

const Feed = ({ currentUser, setCurrentUser }) => {
  console.log(currentUser.transactions);
  console.log(currentUser);
  return (
    <>
      <div
        id="scrollableDiv"
        style={{ height: 250, width: 300, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={currentUser.transactions.length}
          next={currentUser.transactions}
          scrollableTarget="scrollableDiv"
          style={{
            margin: 5,
            border: "black solid 2px",
            padding: ".5rem 0 0 0",
            backgroundColor: "black",
          }}
        >
          {currentUser.transactions &&
            currentUser.transactions.map((t, i) => {

              
              const tstyle =
                t.creditUser._id === currentUser.id
                  ? { backgroundColor: "#00E661" }
                  : { backgroundColor: "#CA2B29" }

              return (
                <div
                  key={i}
                  className="border border-dark rounded mb-2 text-dark p-1"
                  style={tstyle}
                >
                  <img
                    className="postimg"
                    src={`/stock/${currentUser.image}.png`}
                    width="35"
                    height="35"
                    alt='stock profile'
                    style={{
                      borderRadius: "50%",
                      margin: 4,
                    }}
                  />

                  {t.creditUser._id === currentUser.id ? (
                    <>
                      {t.debitUser.username} sent you ${t.amount} for{" "}
                      {t.transactionText}
                    </>
                  ) : (
                    <>
                      You sent {t.creditUser.username} ${t.amount} for{" "}
                      {t.transactionText}
                    </>
                  )}
                </div>

              )
            } 
            )}

        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;
