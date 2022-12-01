import InfiniteScroll from "react-infinite-scroll-component";

const Feed = ({ currentUser, setCurrentUser }) => {

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
            padding: '.5rem 0 0 0'
          }}
        >
          {currentUser.transactions &&
            currentUser.transactions.map((t, i) => {

              return <div key={i}>{t.creditUser.username}</div> 
            })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;