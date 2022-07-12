import React, { Component } from 'react'
import NewsItem from './newsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)}-Bharosa 24/7`
    }
    async loadingNews() {
        this.props.setProgress(15)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=781ab5f87c96475dbe34af3a334cec46&page=${this.state.page}&pageSize=6`;
        this.props.setProgress(45)
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(75)
        let parsedData = await data.json();
        this.props.setProgress(100)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }
    async componentDidMount() {
        this.loadingNews();
    }
    // handlePrevClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     setTimeout(() => {
    //         this.loadingNews();
    //     }, 100);
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     setTimeout(() => {
    //         this.loadingNews();
    //     }, 100);
    // }
    fetchMoreData = async ()=>{
        this.setState({page: this.state.page+1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=781ab5f87c96475dbe34af3a334cec46&page=${this.state.page}&pageSize=6`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
             articles:this.state.articles.concat(parsedData.articles) ,
             totalResults: parsedData.totalResults, 
             loading: false
        })
    }

    render() {
        return (
            <>
                <h1 className='text-center' style = {{marginTop:"5rem" , marginBottom:"2rem"}}>Bharosa 24/7 Top-{this.capitalize(this.props.category)}-Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container" style={{overflow:"hidden"}}>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4 my-3" key={element.url} >
                                <NewsItem title={element.title === null ? "Bharosa 24/7 news" : element.title} description={element.description === null ? "Welcome to Bharosa 24/7 news click read more to read that news" : element.description} imgUrl={element.urlToImage === null ? "/img/images.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div >
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News