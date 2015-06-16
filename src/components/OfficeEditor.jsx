define([
    'React',
    './OfficeForm'
], function (
    React,
    OfficeForm
) {
    var OfficeEditor;

    OfficeEditor = React.createClass({
        _onSubmit: function (office) {
            this.props.onUpdate(office);
        },
        componentDidMount: function () {
        },
        getDefaultProps: function () {
            return {
                disabed: false,
                onUpdate: function (office) {}
            };
        },
        render: function () {
            return (
                <OfficeForm {...this.props}
                            onSubmit={this._onSubmit} />
            );
        }
    });

    return OfficeEditor;
});
