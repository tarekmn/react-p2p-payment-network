import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect,  } from 'react'

const AllFeed = () => {

    const dummy = [
        {
          id:'1',
          title:'Terek paid joe 30$',
        },
        {
          id:'2',
          title:'terek paid ivan 50$'
        },
        {
          id:'3',
          title:'yooooooooooooooooooooooo'
        },
        {
          id:'4',
          title:'yo4'
        },
        {
          id:'5',
          title:'yo4'
        },
        {
          id:'6',
          title:'yo4'
        },
        
    ]

    return(

    <div className="card text-white bg-dark mb-3" style={{maxWidth: "18rem", margin:'0 auto'}}>
        <div className="card-header" style={{margin: 20, textAlign: 'center'}}>All Transcations</div>
        <div className="card-body" style ={{padding:10}}>
            <div className="card-text" style={{padding:10, border: "black 1px solid"}}>
                <div  id="scrollableDiv" style={{ padding:10, height: 130, overflow: "auto",}}>
                    <InfiniteScroll
                        dataLength={dummy.length}
                        next={dummy}
                        scrollableTarget="scrollableDiv"
                    
                    >
                    {dummy.map(item => (
                    <div key={item.id}>
                        <div style={{outline:'1px solid black'}}>
                            {item.title}
                        </div>
                    </div>
                    ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    </div>

    )
}

export default AllFeed  