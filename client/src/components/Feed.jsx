import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const Feed = ({ trans, currentUser }) => {
  // console.log(trans);
  // console.log(currentUser.id);

  return (
    <>
      <div
        id="scrollableDiv"
        style={{ backgroundColor: 'black', height: 250, width: 500 , overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={trans.length}
          next={trans}
          scrollableTarget="scrollableDiv"
          style={{
            marginBottom: 10,
            border: "black solid 2px",
            padding: '.5rem 0 0 0'
          }}
        >
          {trans &&
            trans.map((t, i) => {

              const tstyle = t.creditUser._id === currentUser.id ?
                {
                  backgroundColor: '#ca2b29',
                } :
                {
                  backgroundColor: '#00e661'
                }

              return <div
                key={i}
                className="border border-dark rounded mb-2 text-dark p-1"
                style={tstyle}
              >
                {/* is this transaction a credit ? */}
                {t.creditUser._id === currentUser.id ? (<>
                  {t.debitUser.username} sent you ${t.amount} for {t.transactionText}
                </>) : (<>
                  You sent {t.creditUser.username} ${t.amount} for {t.transactionText}
                </>)}
              </div>
            })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;
