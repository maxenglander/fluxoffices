define([
    'React'
], function (
    React
) {
    var OfficeForm;

    OfficeForm = React.createClass({
        _onCancel: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.props.onCancel();
        },
        _onChange: function (e) {
            var state;
            
            e.preventDefault();
            e.stopPropagation();

            state = {};
            state[e.target.name] = e.target.value;
            this.setState(state);
        },
        _onSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();

            this.props.onSubmit({
                employeeCount: parseInt(this.state.employeeCount) || null,
                id: parseInt(this.state.id) || null,
                name: this.state.name || null
            });
        },
        getInitialState: function () {
            return {
                employeeCount: this.props.employeeCount,
                id: this.props.id,
                name: this.props.name
            };
        },
        getDefaultProps: function () {
            return {
                cancelText: 'Cancel',
                onCancel: function () {},
                onSubmit: function () {},
                submitText: 'Submit'
            };
        },
        render: function () {
            return (
                <form onSubmit={this._onSubmit}>
                    <div>
                        <label>ID</label>
                        <input disabled
                               name='id'
                               readOnly
                               ref='id'
                               type='number'
                               value={this.state.id} />
                    </div>
                    <div>
                        <label>Name</label>
                        <input name='name'
                               onChange={this._onChange}
                               ref='name'
                               type='text'
                               value={this.state.name} />

                    </div>
                    <div>
                        <label>Number of Employees</label>
                        <input name='employeeCount'
                               onChange={this._onChange}
                               ref='employeeCount'
                               type='number'
                               value={this.state.employeeCount} />

                    </div>
                    <div>
                        <button type='submit'>{this.props.submitText}</button>
                        <button onClick={this._onCancel}
                                type='submit'>{this.props.cancelText}</button>
                    </div>
                </form>
            );
        },
        reset: function () {
            this.setState(this.getInitialState());
        }
    });

    return OfficeForm;
});
