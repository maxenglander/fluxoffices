define([
    'React'
], function (
    React
) {
    var OfficeForm;

    OfficeForm = React.createClass({
        _onSubmit: function (e) {
            var $employeeCount
              , $id
              , $name;
                
            e.preventDefault();
            e.stopPropagation();

            $employeeCount = React.findDOMNode(this.refs['employeeCount']);
            $id = React.findDOMNode(this.refs['id']);
            $name = React.findDOMNode(this.refs['name']);

            this.props.onSubmit({
                employeeCount: parseInt($employeeCount.value) || null,
                id: parseInt($id.value) || null,
                name: $name.value || null
            });
        },
        getDefaultProps: function () {
            return {
                onSubmit: function () {}
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
                               value={this.props.id} />
                    </div>
                    <div>
                        <label>Name</label>
                        <input defaultValue={this.props.name}
                               name='name'
                               ref='name'
                               type='text' />
                               
                    </div>
                    <div>
                        <label>Number of Employees</label>
                        <input defaultValue={this.props.employeeCount}
                               name='employeeCount'
                               ref='employeeCount'
                               type='number' />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            );
        }
    });

    return OfficeForm;
});
