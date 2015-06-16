define([
    'events',
    'immutable',
    'object-assign',
    'constants/ActionTypes',
    'dispatchers/Dispatcher',
], function (
    events,
    immutable,
    assign,
    ActionTypes,
    Dispatcher
) {
    var _offices,
        OfficeStore;

    _offices = immutable.List([]);

    OfficeStore = assign({}, events.EventEmitter.prototype, {
        getAll: function () {
            return _offices;
        },
        on: function (name, callback) {
            this.addListener(name, callback);
        },
        off: function (name, callback) {
            this.removeListener(name, callback);
        }
    });

    OfficeStore.dispatchToken = Dispatcher.register(function (payload) {
        switch (payload.actionType) {
            case ActionTypes.OFFICE_CREATED:
                _offices = _offices.push(payload.office);
                OfficeStore.emit(ActionTypes.OFFICE_CREATED, payload.office);
                break;
            case ActionTypes.OFFICE_CREATING:
                OfficeStore.emit(ActionTypes.OFFICE_CREATING, payload.office);
                break;
            case ActionTypes.OFFICE_DELETING:
                OfficeStore.emit(ActionTypes.OFFICE_DELETING, payload.id);
                break;
            case ActionTypes.OFFICE_DELETED:
                _offices = _offices.delete(payload.index);
                OfficeStore.emit(ActionTypes.OFFICE_DELETED, payload.office);
                break;
            case ActionTypes.OFFICE_NOT_FOUND:
                OfficeStore.emit(ActionTypes.OFFICE_NOT_FOUND, payload.id);
                break;
            case ActionTypes.OFFICE_RECEIVED:
                OfficeStore.emit(ActionTypes.OFFICE_RECEIVED, payload.office);
                break;
            case ActionTypes.OFFICE_RECEIVING:
                OfficeStore.emit(ActionTypes.OFFICE_REQUESTED, payload.id);
                break;
            case ActionTypes.OFFICES_RECEIVED:
                _offices = immutable.List(payload.offices);
                OfficeStore.emit(ActionTypes.OFFICES_RECEIVED, payload.offices);
                break;
            case ActionTypes.OFFICES_RECEIVING:
                OfficeStore.emit(ActionTypes.OFFICE_REQUESTED, undefined);
                break;
            case ActionTypes.OFFICE_UPDATING:
                OfficeStore.emit(ActionTypes.OFFICE_UPDATING, payload.office);
                break;
            case ActionTypes.OFFICE_UPDATED:
                _offices = _offices.set(payload.index, payload.office);
                OfficeStore.emit(ActionTypes.OFFICE_UPDATED, payload.office);
                break;
        }

        return true;
    });

    return OfficeStore;
});
