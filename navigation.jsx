
var NavigationComponent = React.createClass( {
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>


                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Link</a></li>
                        </ul>
                        <form class="navbar-form navbar-left">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search">
                      </div>
                                <button type="submit" class="btn btn-default">Submit</button>
                    </form>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#">Link</a></li>
                            </ul>
                  </div>
                          
                    </div>
              </nav>
        )
    }
})