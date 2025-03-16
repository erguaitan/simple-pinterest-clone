import React, { useEffect, useRef, useState } from 'react'
import { createApi } from 'unsplash-js'
import { Masonry } from '@mui/lab';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from './components/Header'
import Card from './components/Card';
import useBookStore from './components/store/bookStore';

const api = createApi({
  accessKey: import.meta.env.VITE_ACCESS_KEY
});

const App = () => {
  const [data, setData] = useState([]);
  let indexPage = useRef(1);
  const [hasMore, setHasMore] = useState(true);

  const valInput = useBookStore(state => state.value)

  useEffect(() => {
    indexPage.current = 1;
    setHasMore(true);

    api.search
      .getPhotos({ query: valInput, perPage: "20", page: indexPage.current })
      .then((result) => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("Something went wrong")
      })
  }, [valInput]);

  const moreData = () => {
    indexPage.current = indexPage.current + 1;
    if (indexPage.current === 3) {
      setHasMore(false);
    }

    api.search
      .getPhotos({ query: valInput, perPage: "20", page: indexPage.current })
      .then((result) => {
        setData(data.concat(result.response.results));
      })
      .catch(() => {
        console.log("Something went wrong")
      })

  }

  return (
    <div className='container'>
      <Header />
      <InfiniteScroll
        dataLength={data.length}
        hasMore={hasMore}
        next={moreData}
        loader={<h4>Loading...</h4>}
        style={{ overflow: 'none' }}
      >
        <Masonry
          columns={{xs:2, sm:3, md:5 }}
          spacing={{xs:1, sm:2, md:3 }} 
          className='masonry'>
          {
            data.map((item) => (
              <Card key={item.id} item={item} />
            ))
          }
        </Masonry>
      </InfiniteScroll>
    </div>
  )
}

export default App
