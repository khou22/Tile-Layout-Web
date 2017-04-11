var GridView = React.createClass({
  // getInitialState: function() {
  //   return {
  //     data: data
  //   }
  // },
  render: function() {
    return (
      <div className="main-grid">
        Hello
      </div>
    );
  }
})

React.render(
  React.createElement(GridView, null),
  document.getElementById('grid')
);
