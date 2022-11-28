import InfiniteScroll from "react-infinite-scroll-component";


const Feed = () => {



    return(
    <>
        <InfiniteScroll
            dataLength={posts.length}
            next={getMorePost}
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
        >
        {posts.map(item => (
            <div key={item.id}>
                <div className="back">
                <strong> {item.id}</strong> {item.title}
            </div>
                {item.completed}
            </div>
        ))}
        </InfiniteScroll>
    </>
    )
}

export default Feed  