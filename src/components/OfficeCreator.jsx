define([
    'React',
    './OfficeForm'
], function (
    React,
    OfficeForm
) {
    var OfficeCreator;

    OfficeCreator = React.createClass({
        _onSubmit: function (office) {
            if ('id' in office) {
                delete office['id'];
            }
            this.props.onCreate(office);
        },
        componentDidMount: function () {
        },
        getDefaultProps: function () {
            return {
                onCreate: function (office) {}
            };
        },
        render: function () {
            return (
                <OfficeForm onSubmit={this._onSubmit} />
            );
        }
    });

    return OfficeCreator;
});
