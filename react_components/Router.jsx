// Contains the router

var BlogPage = require('./BlogPage.jsx');
var BlogpostCreationPage = require('./BlogpostCreationPage.jsx');

var Router = React.createClass({

  componentDidMount: function () {
    console.log('Router mount');


    var self = this;

    //page.base('/');

    page('/', function (ctx) {
      self.setState({ component: <BlogPage /> });
    });

    page('/editblogpost/:id', function (ctx) {
      console.log('editblog page');
      self.setState({ component: <BlogpostCreationPage blogpostid={ctx.params.id} /> });
    });

    page('/createpost', function (ctx) {
      self.setState({ component: <BlogpostCreationPage /> });
    });

    /* esimerkki url-parametristä
    page('/users/:id', function (ctx) {
      self.setState({ component: <Page2 params={ctx.params} /> });
    });
    */

    page('*', function (ctx) {
      self.setState({ component: <PageNotFound /> });
    });


    page.start();

  },

  getInitialState: function () {
    return { component: <div />};
  },

  render: function () {
    console.log('Router render');

    return this.state.component;
  }

});

var PageNotFound = React.createClass({
  render: function() {
    return (
      <div>You find a note with the strange markings "404" scribbled on it.</div>
    );
  }
});


React.render(<Router />, document.getElementById('app'));
