import InfiniteScroll from "react-infinite-scroll-component";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AllFeed = () => {
  const [allTrans, setAllTrans] = useState();

  const getAllTrans = async () => {
    const queryTrans = await fetch("/api/transaction");

    const TransResponse = await queryTrans.json();
    console.log(TransResponse);
    setAllTrans(TransResponse);
  };

  useEffect(() => {
    getAllTrans();
  }, []);

  console.log(allTrans);

  const dummy = [
    {
      id: "1",
      title: "Terek paid Joe $30",
    },
    {
      id: "2",
      title: "Terek paid Ivan $50",
    },
    {
      id: "3",
      title: "Ivan paid Joe $150",
    },
    {
      id: "4",
      title: "Dong paid Alex $2",
    },
    {
      id: "5",
      title: "Jon paid Max $203",
    },
    {
      id: "6",
      title: "Alex paid Terek $83",
    },
  ];

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <div
        className="card text-white bg-dark mb-3"
        style={{
          maxWidth: "30rem",
          height: "auto",
          margin: "0 auto",
          marginTop: 15,
        }}
      >
        <div className="card-header" style={{ textAlign: "center" }}>
          All Transcations
        </div>

        <div
          className="card-body"
          style={{
            paddingBottom: "5px",
          }}
        >
          <div className="card-text">
            <div
              id="scrollableDiv"
              style={{
                height: "auto",
                overflow: "auto",
                paddingBottom: "0px",
              }}
            >
              <InfiniteScroll
                dataLength={dummy.length}
                next={dummy}
                scrollableTarget="scrollableDiv"
              >
                {allTrans &&
                  allTrans.map((t, i) => {
                    const tstyle = { backgroundColor: "white" };

                    return (
                      <div
                        key={i}
                        className="border border-dark rounded mb-2 text-dark p-1"
                        style={tstyle}
                      >
                        <img
                          className="postimg"
                          src={`/stock/${t.debitUser.image}.png`}
                          width="35"
                          height="35"
                          style={{
                            borderRadius: "50%",
                            margin: 4,
                          }}
                        />

                        <>
                          {t.debitUser.username} sent ${t.amount} to{" "}
                          {t.creditUser.username} for "{t.transactionText}"
                        </>
                      </div>
                    );
                  })}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AllFeed;
