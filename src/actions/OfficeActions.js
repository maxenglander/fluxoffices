define([
    'constants/ActionTypes',
    'dispatchers/Dispatcher'
], function (
    ActionTypes,
    Dispatcher
) {
    return {
        getOffice: function (id) {
            var office;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_REQUESTED,
                id: id
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices') || []);

            for (var i = 0; i < offices.length; i++) {
                if (offices[i].id === id) {
                    office = offices[i];
                    break;
                }
            }

            if (office) {
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_RECEIVED,
                    office: office
                });
            } else {
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_NOT_FOUND,
                    id: id
                });
            }
        },
        getOffices: function () {
            var offices;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICES_REQUESTED
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices') || []);

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICES_RECEIVED,
                payload: offices
            });
        }
    };
});
