define([
    'React',
    'actions/OfficeActions',
    'constants/ActionTypes',
    'dispatchers/Dispatcher',
    'stores/OfficeStore',
    './OfficeCreator',
    './OfficeEditor'
], function (
    React,
    OfficeActions,
    ActionTypes,
    Dispatcher,
    OfficeStore,
    OfficeCreator,
    OfficeEditor
) {
    var App;

    App = React.createClass({
        _onCreate: function (office) {
            this.setState({
                committing: true
            }, function () {
                OfficeActions.createOffice(office);
            });
        },
        _onCreated: function (office) {
            this.setState({
                committing: false,
                offices: OfficeStore.getAll()
            });
        },
        _onDelete: function (e) {
            var officeId;

            e.preventDefault();
            e.stopPropagation();

            officeId = parseInt(e.target.dataset.officeId);

            this.setState({
                committing: true
            }, function () {
                OfficeActions.deleteOffice(officeId);
            });
        },
        _onDeleted: function (office) {
            this.setState({
                committing: false,
                offices: OfficeStore.getAll()
            });
        },
        _onEdit: function (e) {
            var officeId;

            e.preventDefault();
            e.stopPropagation();

            officeId = parseInt(e.target.dataset.officeId);

            this.setState({
                editingOfficeId: officeId,
                isEditing: true
            }, function () {
                OfficeActions.getOffice(officeId);
            });
        },
        _onUpdate: function (office) {
            this.setState({
                isCommitting: true
            }, function () {
                OfficeActions.updateOffice(office);
            });
        },
        _onUpdated: function (office) {
            this.setState({
                isCommitting: false,
                offices: OfficeStore.getAll()
            });
        },
        _setOffice: function (office) {
            this.setState({
                office: office
            });
        },
        _setOffices: function (offices) {
            this.setState({
                offices: offices
            });
        },
        componentDidMount: function () {
            OfficeStore.on(ActionTypes.OFFICE_CREATED, this._onCreated);
            OfficeStore.on(ActionTypes.OFFICE_DELETED, this._onDeleted);
            OfficeStore.on(ActionTypes.OFFICE_RECEIVED, this._setOffice);
            OfficeStore.on(ActionTypes.OFFICES_RECEIVED, this._setOffices);
            OfficeStore.on(ActionTypes.OFFICE_UPDATED, this._onUpdated);

            OfficeActions.getOffices();
        },
        componentWillUnmount: function () {
            OfficeStore.off(ActionTypes.OFFICE_CREATED, this._onCreated);
            OfficeStore.off(ActionTypes.OFFICE_DELETED, this._onDeleted);
            OfficeStore.off(ActionTypes.OFFICE_RECEIVED, this._setOffice);
            OfficeStore.off(ActionTypes.OFFICES_RECEIVED, this._setOffices);
            OfficeStore.off(ActionTypes.OFFICE_UPDATED, this._onUpdated);
        },
        getInitialState: function () {
            return {
                editingOfficeId: null,
                isCommitting: false,
                isEditing: false,
                office: null,
                offices: []
            }
        },
        render: function () {
            var editor
              , offices;

            editor = this.state.isEditing && this.state.office
              ? <OfficeEditor {...this.state.office}
                              onUpdate={this._onUpdate} />
              : <OfficeCreator onCreate={this._onCreate} />;

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
            }.bind(this));

            return (
                <div>
                    {editor}
                    <ul className='office-list'>
                        {offices}
                    </ul>
                </div>
            );
        }
    });

    return App;
});
