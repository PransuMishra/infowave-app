import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';  
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


 const News = (props)=> {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [apiExhausted, setApiExhausted] = useState(false); 
    const [isVisible, setIsVisible] = useState(false);

    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
    const fetchArticles = async (currentPage, isMore = false) => {
        props.setProgress(30);

        let url = props.searchQuery ?
            `https://newsapi.org/v2/everything?q=${props.searchQuery}&apikey=${props.apiKey}&page=${currentPage}&pageSize=${props.pageSize}&sortBy=publishedAt` :
            `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${currentPage}&pageSize=${props.pageSize}`;

        if(!isMore) {
            setLoading(true);
        }
        const minLoadTime = 700;
        const delayPromise = new Promise(resolve => setTimeout(resolve, minLoadTime));

        let data = await fetch(url);
        props.setProgress(70);
        let parsedData = await data.json();
        props.setProgress(100);

        const newArticles = parsedData.articles || [];

        if (isMore && newArticles.length === 0) {
            setApiExhausted(true);
        }

        if (isMore) {
            setArticles(prevArticles => prevArticles.concat(newArticles));
        } else {
            setArticles(newArticles);
            setApiExhausted(false);
        }

        setTotalResults(parsedData.totalResults || 0);

        if (!isMore) {
          await delayPromise;
          setLoading(false);
          const pageTitle = props.searchQuery ? `Search Results for: ${props.searchQuery}` : `Top ${capitalizeFirstLetter(props.category)} Headlines`;
          document.title = `${pageTitle} - InfoWave`;
        }
    }

    const updateNews = () => {
        setArticles([]);
        setPage(1);
        setTotalResults(0);
        setApiExhausted(false);
        setLoading(true);
        
        fetchArticles(1, false);
    }

    useEffect(() => {
        updateNews();
    },[props.category, props.searchQuery, props.mode])


    const fetchMoreData = () => {
      if (apiExhausted) return;
      
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        fetchArticles(nextPage, true); 
        return nextPage;
      });
    };


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

     useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) { 
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

       
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    const titleColor = props.mode === 'dark' ? 'white' : 'black';
    let displayTitle = props.searchQuery ? `Search Results for "${props.searchQuery}"` : `InfoWave - Top ${capitalizeFirstLetter(props.category)} Headlines`;
    
    const hasMoreData = (articles.length < totalResults) && !apiExhausted;
    
    return (
      <>
        
        {isVisible && (
            <button
                onClick={scrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: 'auto',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',

                    backgroundColor: props.mode === 'dark' ? '#000000ff' : '#000000ff', 
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(239, 224, 8, 0.3)',
                    fontSize: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.95,
                    transition: 'opacity 0.3s, background-color 0.3s'
                }}
                title="Go to top"
            >
                &#11165;
            </button>
        )}
        
        <h1 className="text-center" 
             style={{
                 margin : '35px 0px', 
                 marginTop : '90px', 
                 color: titleColor
             }}
         >
           {displayTitle}
        </h1>
        
        {loading && <div className="text-center"><Spinner mode={props.mode}/></div>} 

        {(!loading && articles.length === 0 && (props.searchQuery || props.category)) && 
          <p className="text-center my-4" style={{color: titleColor}}>
            No news available for this selection.
          </p>
        }
        
         <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={hasMoreData} 
            loader={hasMoreData ? <div style = {{display : 'flex', justifyContent : 'center'}}><Spinner mode={props.mode}/></div> : null}
          >
          <div className="container my-3">
            <div className='row'>
              {articles.map((element, index)=>{
                  return <div className='col-md-4' key = {element.url ? element.url + index : index}>
                    <NewsItem title={element.title?element.title:""} description ={element.description?element.description:""} 
                    imageUrl ={element.urlToImage}  url={element.url} author={element.author} date={element.publishedAt}
                    source={element.source.name} mode={props.mode}/> 
              </div>
            })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}


News.defaultProps = {
    country : 'us',
    pageSize :6,
    category : 'general',
    searchQuery: null,
    apiKey: '',
    setProgress: () => {},
    mode: 'light'
    }

News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string,
    apiKey: PropTypes.string,
    setProgress: PropTypes.func,
    searchQuery: PropTypes.string,
    mode: PropTypes.string
}

export default News;
