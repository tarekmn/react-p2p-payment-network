import InfiniteScroll from "react-infinite-scroll-component";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AllFeed = () => {
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
          maxWidth: "18rem", 
          margin: "0 auto",
          marginTop: 15
          
        }}
      >
        <div className="card-header" style={{textAlign: 'center'}}>All Transcations</div>
        <div className="card-body">
          <div className="card-text" style={{ border: "black 1px solid" }}>
            <div id="scrollableDiv" style={{ height: 130, overflow: "auto" }}>
              <InfiniteScroll
                dataLength={dummy.length}
                next={dummy}
                scrollableTarget="scrollableDiv"
              >
                {dummy.map((item) => (
                  <div key={item.id}>
                    <div style={{ 
                        outline: "1px solid black",
                        padding: 5
                      }}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AllFeed;
