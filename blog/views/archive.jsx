import React from 'react';
import Head from './head/head';

class Archive extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user ? this.props.user.name : '',
            lastYear = 0,
            posts = this.props.posts;
        let postInfo = posts.map((post, index) => {
                            let year = '';
                            if (lastYear != post.time.year) {
                                year = (<h3>{post.time.year}</h3>);
                                lastYear = post.time.year;
                            }
                            return (<ul className="archive" key={index}>
                                <li>{year}</li>
                                <li className="spec"><time>{post.time.day}</time></li>
                                <li className="spec"><a href={/u/ + post.name + '/' + post.time.day + '/' + post.title}>{post.title}</a></li>
                            </ul>);
                        })
        return (
            <Head title={this.props.title} user={user}>
                {postInfo}
            </Head>
        )
    }
}
 
module.exports = Archive;
