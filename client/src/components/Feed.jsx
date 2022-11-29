import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const Feed = (props) => {
  // console.log(props.trans);
  // console.log(props.currentUser.id);

  return (
    <>
      <div
        id="scrollableDiv"
        style={{ height: 250, width: 300, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={props.trans.length}
          next={props.trans}
          scrollableTarget="scrollableDiv"
          style={{
            margin: 5,
            border: "black solid 2px",
          }}
        >
          {props.trans &&
            props.trans.map((item, i) => (
              <div
                key={i}
                className={`d-flex text-muted pt-3 ${
                  props.currentUser.id === item.sendingUser._id
                    ? `debit`
                    : `credit`
                }`}
              >
                <img
                  className="postimg"
                  src={`/stock/${item.sendingUser.image}.png`}
                  alt='stock profile'
                  width="40"
                  height="40"
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <p
                  className="pb-3 mb-0 small lh-sm border-bottom"
                  style={{
                    border: "black 1px solid",
                    flex: 1,
                    color: "black",
                    margin: 10,
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
