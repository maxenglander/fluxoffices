define([
    'React',
    'actions/OfficeActions',
    'constants/ActionTypes',
    'dispatchers/Dispatcher',
    'stores/OfficeStore'
], function (
    React,
    OfficeActions,
    ActionTypes,
    Dispatcher,
    OfficeStore
) {
    var App;

    App = React.createClass({
        _onDelete: function (e) {
            var officeId;

            e.preventDefault();
            e.stopPropagation();

            officeId = parseInt(e.target.dataset.officeId);
        },
        _onEdit: function (e) {
            var officeId;

            e.preventDefault();
            e.stopPropagation();

            officeId = parseInt(e.target.dataset.officeId);
        },
        _setOffices: function (offices) {
            this.setState({
                offices: offices
            });
        },
        componentDidMount: function () {
            OfficeStore.on(ActionTypes.OFFICE_RECEIVED, this._setOffices);
            OfficeActions.getOffices();
        },
        componentWillUnmoun: function () {
            OfficeStore.off(ActionTypes.OFFICE_RECIEVED, this._setOffices);
        },
        getInitialState: function () {
            return {
                offices: []
            }
        },
        render: function () {
            var editor
              , offices;

            editor = false;

            offices = this.state.offices.map(function (office) {
                return (
                    <li key={'office-' + office.id}>
                        <span>{office.name} [
                            <a data-office-id={office.id}
                               href='#' onClick={this._onEdit}>Edit</a>
                            |
                            <a data-office-id={office.id}
                               href='#' onClick={this._onDelete}>Delete</a>
                        ]</span>
                    </li>
                );
            });

            return (
                <div>
                    <ul className='office-list'>
                        {offices}
                    </ul>
                </div>
            );
        }
    });

    return App;
});
