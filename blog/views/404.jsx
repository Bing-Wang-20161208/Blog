import React from 'react';

class ErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                    <title>404页面</title>
                    <meta name="description" content="" />
                    <meta name="viewport" content="width=device-width" />
                </head>
                <body>
                    <script src="http://www.qq.com/404/search_children.js"></script>
                </body>
            </html>
        );
    }
}

module.exports = ErrorPage;
