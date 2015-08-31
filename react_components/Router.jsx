// Contains the router

var BlogPage = require('./BlogPage.jsx');
var BlogpostCreationPage = require('./BlogpostCreationPage.jsx');

var Router = React.createClass({

  componentDidMount: function () {

    var self = this;

    page.base('/punpu');

    page('/', function (ctx) {
      self.setState({ component: <BlogPage /> });
    });

    page('/editblogpost/:id', function (ctx) {
      self.setState({ component: <BlogpostCreationPage blogpostid={ctx.params.id} /> });
    });

    page('/createblogpost', function (ctx) {
      self.setState({ component: <BlogpostCreationPage /> });
    });

    page('*', function (ctx) {
      self.setState({ component: <PageNotFound /> });
    });


    page.start();

  },

  getInitialState: function () {
    return { component: <div />};
  },

  render: function () {
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
