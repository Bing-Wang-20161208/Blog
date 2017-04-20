import React from 'react';
import Head from './head/head';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user ? this.props.user.name : '';
        return (
            <Head title={this.props.title} user={user}>
                <form method="post" className="post">
                  标题：<br />
                  <input type="text" name="title" /><br />
                  正文：<br />
                  <textarea name="post" rows="20" cols="100"></textarea><br />
                  标签：<br />
                  <input type="text" name="tag1" /><input type="text" name="tag2" /><input type="text" name="tag3" /><br />
                  <button type="submit">发表</button>
                </form>
            </Head>
        )
    }
}
 
module.exports = Post;
