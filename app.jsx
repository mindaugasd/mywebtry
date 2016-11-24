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

var HomePageComponent = function(props) {
    var goProducts = function(e) {
      props.router.push("/products");
    }
    var goAdmin = function(e) {
        props.router.push("/admin/products/new");
    }
    return (
      <div>
        <button onClick={goProducts}>Go to Products</button>
        <button onClick={goAdmin}>Go to Admin</button>
      </div>
    );
  };

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
                            <p>${this.props.price}</p>
                            <p><a href="#" className="btn btn-primary" role="button">Buy</a></p>
                        </div>
                    </div>
                </div>
        );
    }
});

ProductCardComponent.propTypes = {
    image: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
};


var ProductListComponent = function( props ) {
    var productCards = props.products.map( function( product, index ) {
        return (
            <ProductCardComponent
                key={index}
                image={product.image}
                title={product.title}
                price={product.price}
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
        axios.get('https://itakademija.herokuapp.com/api/products')
        .then(function (response) {
            self.setState({ products: response.data });
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
    return <div>{props.children}</div>;
};

var NoMatch = function(props) {
    return <div>Route did not match</div>;
};
  
var ProductListPage = function() {
    return <ProductListComponent products={myProducts} />
} 


var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;
var IndexRoute = window.ReactRouter.IndexRoute;
 
ReactDOM.render((
        <Router history={window.ReactRouter.hashHistory}>
            <Route path="/" component={App}>
                <Route path="/home" component={HomePageComponent} />
                <Route path="/products" component={ProductListContainer} />
                <Route path="/admin/products/new" component={ProductAdministrationComponent} />
                <Route path="/admin/products/:id" component={ProductAdministrationComponent} />
                <Route path="*" component={NoMatch}/>
            </Route>
        </Router>
), document.getElementById('root'));