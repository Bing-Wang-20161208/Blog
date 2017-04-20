import React from 'react';

class Paging extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let prepage,
            nextpage;
        if (!this.props.isFirstPage) {
            prepage = <span className="prepage"><a href={'?p=' + parseFloat(this.props.page - 1)} title="上一页"><span className="glyphicon glyphicon-backward" aria-hidden="true"></span>上一页</a></span>
        }
        if (!this.props.isLastPage) {
            nextpage = <span className="nextpage"><a href={'?p=' + parseFloat(this.props.page + 1)} title="下一页">下一页<span className="glyphicon glyphicon-forward" aria-hidden="true"></span></a></span>
        }
        return (
            <div className="changePage">
                {prepage}
                {nextpage}
            </div>
        );
    }
}

module.exports = Paging;
