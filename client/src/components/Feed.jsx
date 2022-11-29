import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const Feed = (props) => {
  console.log(props.trans);
  const dummy = [
    {
      id: "1",
      title: "Terek paid joe 30$",
    },
    {
      id: "2",
      title: "terek paid ivan 50$",
    },
    {
      id: "3",
      title: "yooooooooooooooooooooooo",
    },
    {
      id: "4",
      title: "yo4",
    },
    {
      id: "5",
      title: "yo4",
    },
    {
      id: "6",
      title: "yo4",
    },
  ];

  return (
    <>
      <div
        id="scrollableDiv"
        style={{ height: 250, width: 300, overflow: "auto" }}
      >
        <InfiniteScroll
          dataLength={dummy.length}
          next={dummy}
          scrollableTarget="scrollableDiv"
        >
          {/* {dummy.map(item => (
                <div key={item.id}>
                    <div style={{outline:'1px solid black'}}>
                        {item.title}
                    </div>
                </div>
            ))} */}

          {props.trans &&
            props.trans.map((item, i) => (
              <div key={i} className={`d-flex text-muted pt-3 ${item.type}`}>
                <img className="postimg" src="" width="32" height="32" />
                <p
                  className="pb-3 mb-0 small lh-sm border-bottom"
                  style={{ flex: 1, color: "black", margin: 20 }}
                >
                  <strong className="d-block text-gray-dark">
                    <a
                      className="purple-color"
                      href="/users/{{post.User.id}}"
                      style={{ flex: 1, color: "black", margin: 20 }}
                    >
                      Amount $ {item.type === "credit" ? `+` : `-`}
                      {item.amount}
                    </a>
                  </strong>
                  {item.transactionText}
                </p>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Feed;
