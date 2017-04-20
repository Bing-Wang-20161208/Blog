import React from 'react';
import Head from './head/head';
import Paging from './paging';

class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user ? this.props.user.name : '',
            posts = this.props.posts;
        let postInfo = posts.map((post, index) => {
            return (<div key={index} className="content">
                        <div className="boundary"></div>
                        <div className="ownInfo">
                            <a href={/u/ + post.name}><img src={post.head} className="headImg" alt="头像"/></a>
                            <a href={/u/ + post.name} className="author">{post.name}</a>
                            <span className="postTime">{post.time.minute}前</span>
                            {post.reprint_info.reprint_from ? <a href={/u/ + post.reprint_info.reprint_from.name + '/' + post.reprint_info.reprint_from.day + '/' + post.reprint_info.reprint_from.title} className="backLinks">原文链接</a> : ''}
                        </div>
                        <div className="postInfo">
                            <h2><a href={/u/ + post.name + '/' + post.time.day + '/' + post.title} className="postTitle">{post.title}</a></h2>
                            <p dangerouslySetInnerHTML={{__html: post.post}} className="postText"></p>
                        </div>
                        <div className="otherInfo">
                            {post.tags.map((tag, index) => tag ? <span className="tag" key={'indexTag' + index}>{tag}</span> : '')}
                            <span className="readNum"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> {post.pv}</span>
                            <span className="commentNum"><span className="glyphicon glyphicon-comment" aria-hidden="true"></span> {post.comments.length}</span>
                            <span className="reprintNum"><span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span> {post.reprint_info.reprint_to ?  post.reprint_info.reprint_to.length : 0}</span>
                        </div>
                    </div>);
                })
        return (
            <Head title={this.props.title} user={user}>
                {postInfo}
                <Paging isFirstPage={this.props.isFirstPage} isLastPage={this.props.isLastPage} page={this.props.page} />
            </Head>
        )
    }
}
 
module.exports = Index;
