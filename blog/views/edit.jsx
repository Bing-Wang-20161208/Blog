import React from 'react';
import Head from './head/head';

class Edit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user ? this.props.user.name : '';
        let post = this.props.post;
        return (
            <Head title={this.props.title} user={user}>
                <form method="post" className="editPage">
                    <input type="text" name="title" value={post.title} disabled="disabled" />
                    <input type="text" name="tag1" value={post.tags[0]} disabled="disabled" className="tag" />
                    <input type="text" name="tag2" value={post.tags[1]} disabled="disabled" className="tag" />
                    <input type="text" name="tag3" value={post.tags[2]} disabled="disabled" className="tag" /><br />
                    <textarea name="post" rows="20" cols="100" defaultValue={post.post}></textarea>
                    <button type="submit">保存修改</button>
                  </form>
            </Head>
        )
    }
}
 
module.exports = Edit;
