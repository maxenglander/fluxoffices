define([
    'React',
    './OfficeForm'
], function (
    React,
    OfficeForm
) {
    var OfficeCreator;

    OfficeCreator = React.createClass({
        _onCancel: function () {
            this.refs['form'].reset();
        },
        _onSubmit: function (office) {
            if ('id' in office) {
                delete office['id'];
            }
            this.props.onCreate(office);
            this.refs['form'].reset();
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
                <OfficeForm cancelText='Reset'
                            onCancel={this._onCancel}
                            onSubmit={this._onSubmit}
                            ref='form'
                            submitText='Create' />
            );
        }
    });

    return OfficeCreator;
});
