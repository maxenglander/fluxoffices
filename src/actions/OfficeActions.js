define([
    'constants/ActionTypes',
    'dispatchers/Dispatcher'
], function (
    ActionTypes,
    Dispatcher
) {
    return {
        createOffice: function (office) {
            var officeId
              , offices;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_CREATING,
                office: office
            });

            officeId = Date.now();
            offices = JSON.parse(window.sessionStorage.getItem('offices')) || [];

            office['id'] = officeId;
            offices.push(office);
            window.sessionStorage.setItem('offices', JSON.stringify(offices));

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_CREATED,
                office: office
            });
        },
        deleteOffice: function (id) {
            var index
              , office
              , offices;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_DELETING,
                id: id
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices')) || [];
            for (var i = 0; i < offices.length; i++) {
                if (id === offices[i].id) {
                    index = i;
                    break;
                }
            }

            if (undefined !== index) {
                office = offices.splice(index, 1);
                window.sessionStorage.setItem('offices', JSON.stringify(offices));
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_DELETED,
                    id: id,
                    index: index,
                    office: office
                });
            } else {
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_NOT_FOUND,
                    id: id
                });
            }
        },
        getOffice: function (id) {
            var office;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_RECEIVING,
                id: id
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices')) || [];

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
                actionType: ActionTypes.OFFICES_RECEIVING
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices')) || [];

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICES_RECEIVED,
                offices: offices
            });
        },
        updateOffice: function (office) {
            var index,
                offices;

            Dispatcher.dispatch({
                actionType: ActionTypes.OFFICE_UPDATING,
                office: office
            });

            offices = JSON.parse(window.sessionStorage.getItem('offices')) || [];

            for (var i = 0; i < offices.length; i++) {
                if (offices[i].id === office.id) {
                    index = i;
                    break;
                }
            }

            if (undefined !== index) {
                offices[index] = office;
                window.sessionStorage.setItem('offices', JSON.stringify(offices));
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_UPDATED,
                    index: index,
                    office: office
                });
            } else {
                Dispatcher.dispatch({
                    actionType: ActionTypes.OFFICE_NOT_FOUND,
                    id: office.id,
                    office: office
                });
            }
        }
    };
});
