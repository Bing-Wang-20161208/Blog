import React from 'react';

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        let showC = this.props.comments.map((comment, i) => {
            return (<div className="oldComment" key={i}>
                        <p>
                            <img src={comment.head} /><a href={comment.website}>{comment.name}</a>
                            <span><i>回复于</i>{comment.time}</span>
                        </p>
                        <p dangerouslySetInnerHTML={{__html: comment.content}} className="commentText"></p>
                    </div>);
        })
        return (
            <div className="commentForm">
                {showC}
                <form method="post">
                    {user ? (
                        <div className="comment">
                            姓名：<input type="text" name="name" defaultValue={user.name} />
                            邮箱：<input type="email" name="email" defaultValue={user.email} />
                            个人网站：<input type="url" name="website" defaultValue={'http:///u/' + user.name} />
                        </div>
                    ) : (
                        <div className="comment">
                            姓名：<input type="text" name="name" />
                            邮箱：<input type="email" name="email" />
                            个人网站：<input type="url" name="website" value="http://" />
                        </div>
                    )}
                    <textarea name="content" rows="5" cols="80"></textarea>
                    <button type="submit">留言</button>
                </form>
            </div>
        );
    }
}
module.exports = Comment;