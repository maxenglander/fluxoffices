define([
    'React',
    './components/App'
], function (
    React,
    App
) {
    return {
        run: function () {
            React.render(React.createElement(App), document.body);
        }
    }
});
