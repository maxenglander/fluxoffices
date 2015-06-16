define([
    'events',
    'object-assign',
    'constants/ActionTypes',
    'dispatchers/Dispatcher',
], function (
    events,
    assign,
    ActionTypes,
    Dispatcher
) {
    var OfficeStore;

    OfficeStore = assign({}, events.EventEmitter.prototype, {
        on: function (name, callback) {
            this.addListener(name, callback);
        },
        off: function (name, callback) {
            this.removeListener(name, callback);
        }
    });

    OfficeStore.dispatchToken = Dispatcher.register(function (payload) {
        switch (payload.actionType) {
            case ActionTypes.OFFICE_NOT_FOUND:
                OfficeStore.emit(ActionTypes.OFFICE_NOT_FOUND, payload.id);
                break;
            case ActionTypes.OFFICE_RECEIVED:
                OfficeStore.emit(ActionTypes.OFFICE_RECEIVED, payload.office);
                break;
            case ActionTypes.OFFICE_REQUESTED:
                OfficeStore.emit(ActionTypes.OFFICE_REQUESTED, payload.id);
                break;
            case ActionTypes.OFFICES_RECEIVED:
                OfficeStore.emit(ActionTypes.OFFICE_RECEIVED, payload.offices);
                break;
            case ActionTypes.OFFICES_REQUESTED:
                OfficeStore.emit(ActionTypes.OFFICE_REQUESTED, undefined);
                break;
        }

        return true;
    });

    return OfficeStore;
});
