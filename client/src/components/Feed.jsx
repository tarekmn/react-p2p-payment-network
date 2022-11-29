import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, } from 'react'

const Feed = ({ trans }) => {



  return (
    <>
      <div id="scrollableDiv" style={{ height: 130, overflow: "auto", }}>
        <InfiniteScroll
          dataLength={trans.length}
          next={trans}
          scrollableTarget="scrollableDiv"

        >
          {trans.map(t => (
            <div key={t._id}>
              <div style={{ outline: '1px solid black' }}>
                {t.title}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </>
  )
}

export default Feed  