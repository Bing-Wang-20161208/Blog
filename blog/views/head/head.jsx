import React from 'react';

class Head extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <title> {this.props.title} </title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                    <link rel="stylesheet" href="/stylesheets/normalize.css"/>
                    <link rel="stylesheet" href="/stylesheets/bootstrap.min.css"/>
                    <link rel="stylesheet" href="/stylesheets/whole.css" />
                    <script src="/kindEditor/kindeditor-min.js"></script>
                    <script src="/kindEditor/lang/zh_CN.js"></script>
                    <script src="/javascripts/kindEditor.js"></script>
                    <script src="/javascripts/browser.js"></script>
                </head>
                <body>
                    <header>
                        <div className="userName" style={{color: '#fff', cursor: 'default'}} title="你自己">{this.props.user}</div>
                        <form action="/search" method="GET" className="searchForm">
                            <input type="text" name="keyword" placeholder="搜索" className="search" />
                        </form>
                        <nav className="navBar">
                            <a href="/" title="Home"><span data-hover="主页">主页</span></a>
                            <a href="/archive" title="Archive"><span data-hover="存档">存档</span></a>
                            {this.props.user ?
                                <span>
                                    <a href="/post" title="Post"><span data-hover="发表">发表</span></a>
                                    <a href="/logout" title="Logout"><span data-hover="登出">退出</span></a>
                                </span>
                                             :
                                <span>
                                    <a href="/login" title="Login"><span data-hover="登录">登录</span></a>
                                    <a href="/reg" title="Register"><span data-hover="注册">注册</span></a>
                                </span>
                            }  
                        </nav>
                    </header>
                    <div className="framework">{this.props.children}</div>
                    <footer>
                        <div className="Links">
                            个人链接：<a href="http://www.jianshu.com/u/675e58f21751" title="简书博客">个人博客</a> | <a href="https://github.com/Bing-Wang-20161208" title="男性交友网站">Github</a>
                        </div>
                        <div className="myIntro">
                            大兴帝国-王某人
                        </div>
                    </footer>
                </body>
            </html>
        );
    }
}

module.exports = Head;