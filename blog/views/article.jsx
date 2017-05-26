import React from 'react';
import Head from './head/head';
import Comment from './comment';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user ? this.props.user : '';
        // 当用户是游客、目前作者、上级作者、已转载时，flag=0，即不显示转载链接  当flag=1时，显示转载链接，即该文章可转载
        let flag = 1,
            post = this.props.post,
            reprint;
        if (user && (user.name != post.name)) {
            if ((post.reprint_info.reprint_from != undefined) && (user.name == post.reprint_info.reprint_from.name)) {
                flag = 0;
            }
            if (post.reprint_info.reprint_to != undefined) {
                post.reprint_info.reprint_to.forEach(function(reprint_to, index) {
                    if (user.name == reprint_to.name) {
                        flag = 0;
                    }
                })
            }
        } else {
            flag = 0;
        }
        if (flag) {
            reprint = <span><a href={/reprint/ + post.name + '/' + post.time.day + '/' + post.title} className="edit">转载</a></span>
        }
        //标签
        let tag = post.tags.forEach((tag, index) => {
            tag ? <a className="tag" href={/tag/ + tag} key={index}>{tag}</a> : '';
        })
        return (
            <Head title={this.props.title} user={user.name}>
                <div className="articleTitle"><h1>{post.title}</h1></div>
                <div className="articleInfo">
                    <div className="left">
                        <a href={/u/ + post.name}><img src={post.head} className="headImg" alt="头像"/></a>
                        <a href={/u/ + post.name} className="author">{post.name}</a>
                        <span className="postTime">{post.time.minute}</span>
                        {post.tags.map((tag, index) => tag ? <span className="tag" key={'indexTag' + index}>{tag}</span> : '')}
                        <span className="readNum" title="阅读量"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> {post.pv}</span>
                        <span className="commentNum" title="评论数"><span className="glyphicon glyphicon-comment" aria-hidden="true"></span> {post.comments.length}</span>
                        <span className="reprintNum" title="转载数"><span className="glyphicon glyphicon-share-alt" aria-hidden="true"></span> {post.reprint_info.reprint_to ?  post.reprint_info.reprint_to.length : 0}</span>
                    </div>
                    <div className="right">
                        {user && (user.name == post.name) ? 
                        <span>
                            <a className="edit" href={/edit/ + post.name + '/' + post.time.day + '/' + post.title}>编辑</a>
                            <a className="edit" href={/remove/ + post.name + '/' + post.time.day + '/' + post.title}>删除</a>
                        </span> 
                        : ''}
                        {reprint}
                    </div>
                </div>
                <p dangerouslySetInnerHTML={{__html: post.post}} className="articlePostText"></p>
                <Comment comments={post.comments} user={user}/>
            </Head>
        )
    }
}
 
module.exports = Article;
