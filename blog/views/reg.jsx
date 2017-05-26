import React from 'react';

class Registry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <title>注册</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="stylesheets/bootstrap.min.css"/>
                    <link rel="stylesheet" href="stylesheets/reg.css"/>
                    <script src="javascripts/browser.js"></script>
                </head>
                <body>
                    <div id="reg">
                        <a href="/" title="返回首页" className="home">回去。。。</a>
                        <div className="regInfo">
                            {this.props.success ? this.props.success : this.props.error}
                        </div>
                        <form method='post'>
                            <div className="inputs">
                                <span className="glyphicon glyphicon-user" aria-hidden="true"></span><input type="text" name="name" placeholder="请输入用户名,啥都可以" autoFocus />
                                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span><input type="password" name="password" placeholder="请输入密码，啥都可以" ref="pwd" />
                                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span><input type="password" name="password-repeat" placeholder="请重复输入密码，你高兴吗" />
                                <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span><input type="email" name="email" placeholder="请输入邮箱，有点像ad@ap.adc,你信吗" />
                                <button type="submit">注册</button>
                            </div>
                        </form>
						<p>头像来自于 <a href="http://en.gravatar.com/">Qravatar</a> 网站注册时的头像，该处邮箱与 <a href="http://en.gravatar.com/">Gravatar</a> 相同即可</p>
                        <a href="/login" title="login">有号，去登陆。。。</a>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Registry;
