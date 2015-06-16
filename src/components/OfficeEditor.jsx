define([
    'React',
    './OfficeForm'
], function (
    React,
    OfficeForm
) {
    var OfficeEditor;

    OfficeEditor = React.createClass({
        _onCancel: function () {
            console.log('OfficeEditor _onCancel');
            this.props.onCancel();
        },
        _onSubmit: function (office) {
            this.props.onUpdate(office);
        },
        componentDidMount: function () {
        },
        getDefaultProps: function () {
            return {
                disabed: false,
                onCancel: function () {},
                onUpdate: function (office) {}
            };
        },
        render: function () {
            return (
                <OfficeForm {...this.props}
                            onCancel={this._onCancel}
                            onSubmit={this._onSubmit}
                            submitText='Update' />
            );
        }
    });

    return OfficeEditor;
});
