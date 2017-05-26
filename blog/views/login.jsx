import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <title>登录</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="stylesheets/bootstrap.min.css"/>
                    <link rel="stylesheet" href="stylesheets/login.css"/>
                    <script src="javascripts/browser.js"></script>
                </head>
                <body>
                    <div id="login">
                        <a href="/" title="返回首页" className="home">回去。。。</a>
                        <div className="logInfo">
                            {this.props.success ? this.props.success : this.props.error}
                        </div>
                        <form method='post'>
                            <div className="inputs">
                                <span className="glyphicon glyphicon-user" aria-hidden="true"></span><input type="text" name="name" placeholder="输你名字" autoFocus />
                                <span className="glyphicon glyphicon-lock" aria-hidden="true"></span><input type="password" name="password" placeholder="还有密码" />
                                <button type="submit">登录</button>
                            </div>
                        </form>
                        <a href="/reg" title="registry">等等，我先注册。。。</a>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Login;
