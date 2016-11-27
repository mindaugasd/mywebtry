/*var React = require('react');
var ReactDOM = require('react-dom');
*/
var ProductAdministrationComponent = React.createClass( {
    getInitialState: function() {
        return {
            title: 'default',
            image: 'default',
            description: 'default',
            price: 0,
            quantity: 0
        };
    },

    handleTitleChange: function( event ) {
        this.setState( { title: event.target.value });
    },

    handleImageChange: function( event ) {
        this.setState( { image: event.target.value });
    },

    handleDescriptionChange: function( event ) {
        this.setState( { description: event.target.value });
    },

    handlePriceChange: function( event ) {
        this.setState( { price: event.target.value });
    },

    handleQuantityChange: function( event ) {
        this.setState( { quantity: event.target.value });
    },

    handleSubmit: function( event ) {
        console.log( 'Submitted', this.state );
        event.preventDefault();
    },

    render: function() {
/*        var title;
        var id = this.props.params.id;
        if (id === 'new') {
            
        }*/
        return (
                
            <form onSubmit={this.handleSubmit}>
                <h3>Add new item</h3>
                <label>Name:</label><br />
                <input type="text" value={this.state.title} onChange={this.handleTitleChange} /><br />
                <label>Image url:</label><br />
                <input type="text" value={this.state.image} onChange={this.handleImageChange} /><br />
                <label>Description:</label><br />
                <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} /><br />
                <label>Price:</label><br />
                <input type="number" step="any" value={this.state.price} onChange={this.handlePriceChange} /><br />
                <label>Qty.:</label><br />
                <input type="number" value={this.state.quantity} onChange={this.handleQuantityChange} /><br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
});



var styles = {
        thumbnail: {
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
            },
        image: {
            height: '200px', display: 'block'
        }
}

var ProductCardComponent = React.createClass( {

    render: function() {
        return (
                <div className="col-sm-6 col-md-4">
                    <div className="thumbnail" style={styles.thumbnail}>
                <img src={this.props.image} alt="image" style={styles.image} />
                        <div className="caption">
                            <h3>{this.props.title}</h3>
                            <p>{this.props.artist}</p>
                            <p>{this.props.year}</p>
                            <p><a href={"https://www.discogs.com/release/" + this.props.item_id} className="btn btn-primary" role="button">Buy</a></p>
                        </div>
                    </div>
                </div>
        );
    }
});

ProductCardComponent.propTypes = {
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    year: React.PropTypes.number.isRequired,
    item_id: React.PropTypes.number.isRequired
};


var ProductListComponent = function( props ) {
    var productCards = props.products.map( function( product, index ) {
        return (
            <ProductCardComponent
                key={index}
                image='https://s.discogs.com/images/default-release.png'
                title={product.basic_information.title}
                artist={product.basic_information.artists[0].name}
                year={product.basic_information.year}
                item_id={product.id}
                />
        );
    });
    return ( <div className="row">{productCards} </div>);
};




var ProductListContainer = React.createClass({
    getInitialState: function() {
        return {
          products: [] 
          
        };
    },

    componentWillMount: function() {
        var self = this;
        axios.get('https://api.discogs.com/users/mindzia/collection//folders/0/releases')
        .then(function (response) {
            self.setState({ products: response.data.releases });
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    render: function() {
        return <ProductListComponent products={this.state.products} />
  }
});

ProductListComponent.propTypes = {
    products: React.PropTypes.array.isRequired,
};


var App = function(props) {
    var goHome = function(e) {
        props.router.push("/");
    }
    var goProducts = function(e) {
        props.router.push("/products");
      }
      var goAdmin = function(e) {
          props.router.push("/admin/products/new");
      }
    

    return (
            <div>
            <nav className="navbar navbar-default">
            <ul className="nav navbar-nav">
            <li><a onClick={goHome}>Home </a></li>
            <li><a onClick={goProducts}>Collection </a></li>
            <li><a onClick={goAdmin}>Admin </a></li>
            </ul>
            </nav>
            <div>{props.children}</div>
            </div>);
};

var NoMatch = function(props) {
    return <div>Route did not match</div>;
};

var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var IndexRoute = window.ReactRouter.IndexRoute;
 
ReactDOM.render((
        <Router history={window.ReactRouter.hashHistory}>
            <Route path="/" component={App}>
                
                <Route path="/products" component={ProductListContainer} />
                <Route path="/admin/products/new" component={ProductAdministrationComponent} />
                <Route path="/admin/products/:id" component={ProductAdministrationComponent} />
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
), document.getElementById('root'));