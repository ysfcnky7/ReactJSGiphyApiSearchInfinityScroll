import React from 'react';
import ReactDOM from 'react-dom';
import GifList from './GifList';
import SearchBar from './SearchBar';
import request from 'superagent';
import './App.css';
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            searchword: null,
            count: 20,
            pageNumber: 20,
            items: 20,
            hasMore: true
        }
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleTermChangeLoad = this.handleTermChangeLoad.bind(this)
        this.SearchSubmitBtnFunc = this.SearchSubmitBtnFunc.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.handleTermChangeLoad();
    }
    handleTermChangeLoad() {
        this.setState({ searchword: "" })
        const urldd = `https://api.giphy.com/v1/gifs/trending?api_key=0M7NFEOihpvP4VJRzc4dHYRLxBNl5W2h&limit=20`;
        request.get(urldd, (err, resff) => {
            this.setState({ gifs: resff.body.data })
        });
    }
    handleTermChange(term) {
        const timer = setTimeout(() => {
            this.state.searchWord = term;
        }, 1000);
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=S6xd0JCy4JX55yzz6MQbAsWX6Hj4gTwU&limit=20`;
        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data })
        });
    }
    SearchSubmitBtnFunc(e) {
        e.preventDefault();
        this.state.count += 20;
        let counter = this.state.count;
        let searchWord = this.state.searchWord;
        const urlLoad = `http://api.giphy.com/v1/gifs/search?q=${searchWord.replace(/\s/g, '+')}&api_key=S6xd0JCy4JX55yzz6MQbAsWX6Hj4gTwU&limit=${counter}`;
        setTimeout(() => {
            request.get(urlLoad, (err, resLoad) => {
                this.setState({ gifs: resLoad.body.data })
            });
        }, 1500);
    }
    fetchData = () => {
        var aa = 10;
        let mySearchWord = this.state.searchWord;
        if (mySearchWord !== undefined) {
            axios.get(`http://api.giphy.com/v1/gifs/search?q=${mySearchWord.replace(/\s/g,
                '+')}&api_key=S6xd0JCy4JX55yzz6MQbAsWX6Hj4gTwU&limit=${this.state.pageNumber}`)
                .then((response) => {
                    this.setState({
                        gifs: response.data.data,
                        pageNumber: this.state.pageNumber + 20
                    })
                })
                .catch((e) => {
                    var bb = 44;
                    console.error(e);
                });
        }

    };
    render() {
        return (
            <div>
                <h1>Huawei Demo Project</h1>
                <hr />
                <SearchBar
                    id="searchword"
                    name="searchword"
                    autofocus="autofocus"
                    onTermChange={this.handleTermChange}
                    value={this.state.searchword}
                />
                <InfiniteScroll
                    dataLength={this.state.gifs.length}
                    next={this.fetchData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <GifList gifs={this.state.gifs} />
                </InfiniteScroll>
                <button onClick={this.SearchSubmitBtnFunc}>Load More</button>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
