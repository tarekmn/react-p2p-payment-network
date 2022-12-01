import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";


const Feed = ({ trans, currentUser }) => {
 


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

                <img
                  className="postimg"
                  src={`/stock/${item.sendingUser.image}.png`}
                  width="35"
                  height="35"
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <p
                  className="pb-3 mb-0 small lh-sm border-bottom"
                  style={{
                    border: "white 1px solid",
                    flex: 1,
                    color: "black",
                    margin: 5,
                  }}
                >
                  <strong className="d-block text-gray-dark">
                    <a
                      className="purple-color"
                      href="/users/{{post.User.id}}"
                      style={{ flex: 1, color: "black", margin: 20 }}
                    >
                      Amount ${" "}
                      {props.currentUser.id === item.sendingUser._id
                        ? `-`
                        : `+`}
                      {item.amount}
                    </a>
                  </strong>
                  {item.sendingUser.username +
                    `  sent $${item.amount} to ` +
                    item.recievingUser.username +
                    ` for ` +
                    item.transactionText}
                </p>
              
              </div>

              
            ))}

        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;
