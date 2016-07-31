/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 10/03/16
 * Time: 17:29
 * To change this template use File | Settings | File Templates.
 */

var reminderModule = angular.module('Optimise.reminders', ['ui.bootstrap']);





reminderModule.factory('Reminder', function () {
    return function (USUBJID) {
        var Reminder = {
            USUBJID : USUBJID,
            SUBJID : '',
            STUDYID : 'OPTIMISE',
            DOMAIN:'REMINDER',
            REMINDERFREQUENCY: '',
            REMINDERCATEGORY: '',
            REMINDERSTDTC: new Date(),
            REMINDERENDTC: new Date(),
            REMINDERNOTES:''
        }
        return Reminder;
    }
});


reminderModule.service('reminders', function (viewService, records, Reminder) {
    var labReminder = null;

    var getLabReminder = function() {
        return labReminder;
    }

    var saveLabReminder = function(newReminder) {
        labReminder = newReminder;
        if (!viewService.workOffline())
            records.saveReminder(newReminder);
    }

    var deleteReminders = function () {
        labReminder = null;
    }

    var editLabReminder = function(reminder, resName, resValue) {
        if (!viewService.workOffline())
        {
            var USUBJID = {fieldName: "USUBJID", value: reminder.USUBJID};
            var CAT = {fieldName:"REMINDERCATEGORY", value: reminder.REMINDERCATEGORY};
            var RESTOCHANGE = {fieldName:resName, value: resValue};
            //console.log(RESTOCHANGE);

            var idRecord = [USUBJID, CAT];
            var valueRecord = [RESTOCHANGE];
            records.editReminder(idRecord, valueRecord);
        }
    };

    var deleteLabReminder = function (USUBJID){
        if (!viewService.workOffline())
            records.deleteReminder(USUBJID);
    }

    var populateReminder = function (RecordItems) {
        labReminder = new Reminder();
        for (var i = 0; i < RecordItems.length; i++){
            switch (RecordItems[i].fieldName) {
                case 'STUDYID':{
                    labReminder.STUDYID = RecordItems[i].value;
                    break;
                }
                case 'DOMAIN':{
                    labReminder.DOMAIN = RecordItems[i].value;
                    break;
                }
                case 'USUBJID':{
                    labReminder.USUBJID = RecordItems[i].value;
                    break;
                }
                case 'SUBJID': {
                    labReminder.SUBJID = RecordItems[i].value;
                }
                case 'REMINDERFREQUENCY': {
                    labReminder.REMINDERFREQUENCY = RecordItems[i].value;
                }
                case 'REMINDERCATEGORY': {
                    labReminder.REMINDERCATEGORY = RecordItems[i].value;
                }

                case 'REMINDERSTDTC': {
                    labReminder.REMINDERSTDTC = records.formatStringToDate(RecordItems[i].value);
                }
                case 'REMINDERENDTC': {
                    labReminder.REMINDERENDTC = records.formatStringToDate(RecordItems[i].value);
                }

                case 'REMINDERNOTES': {
                    labReminder.REMINDERNOTES = RecordItems[i].value;
                }
            }
        }
        console.log(labReminder);
    }

    return {
        saveLabReminder: saveLabReminder,
        getLabReminder: getLabReminder,
        editLabReminder: editLabReminder,
        deleteLabReminder: deleteLabReminder,
        deleteReminders: deleteReminders,
        populateReminder: populateReminder
    }
});

reminderModule.controller('reminderInfoCtrl', function($scope,
                                                        $rootScope,
                                                        viewService,
                                                        reminders, Reminder) {


    $scope.showThisContent = function() {
        if (viewService.getView().Section=='Reminders') {
            return true;
        }
        else
            return false;
    }

    $rootScope.setNewReminderFields = function () {
        $scope.reminder ={"start":'',
            "end":'',
            "on":'Off',
            "notes": ""};
        $scope.USUBJID = '';
        $scope.SUBJID = '';
    }

    var clearFields = function() {
        $scope.reminder ={"start":'',
            "end":'',
            "on":'Off',
            "notes": ""};
    }

    $rootScope.displayReminder = function() {
        clearFields();
        var theReminder = reminders.getLabReminder();
        if (theReminder != null) {
            $scope.reminder.on = "On";
            $scope.reminder.notes = theReminder.REMINDERNOTES;
            $scope.reminder.start = theReminder.REMINDERSTDTC;
            $scope.reminder.end = theReminder.REMINDERENDTC;

            var secondsInADay = 86400;
            switch (theReminder.REMINDERFREQUENCY) {
                case (secondsInADay * 7): {
                    $scope.reminder.frequency = 'Once/ Week';
                    break;
                }

                case (secondsInADay * 30.5): {
                    $scope.reminder.frequency = 'Once/ Month';
                    break;
                }

                case (secondsInADay * (30.5/2)): {
                    $scope.reminder.frequency = 'Twice/ Month';
                    break;
                }

                case (secondsInADay * 365): {
                    $scope.reminder.frequency = 'Once/ Year';
                    break;
                }

                case (secondsInADay * (365/2)): {
                    $scope.reminder.frequency = 'Twice/ Year';
                    break;
                }

            }
        }
    }

    var currentDate = new Date();
//    $scope.USUBJID = '';
//    $scope.SUBJID = '';

    $rootScope.setReminderSUBJID = function(USUBJID, SUBJID) {
        //console.log("setting Reminders");
        $scope.USUBJID = USUBJID;
        $scope.SUBJID = SUBJID;

    }

    $rootScope.setNewReminderFields();

//    $scope.reminder ={"start":'',
//        "end":'',
//        "on":'Off',
//        'frequency':"",
//        "notes": "eg. test name"};

    var isThisADate = function(ddmmyy) {
        //console.log(ddmmyy);
        if ( Object.prototype.toString.call(ddmmyy) === "[object Date]" ) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.setReminder = function () {
        if ($scope.reminder.on == "On") {

            var startDate = new Date($scope.reminder.start.substr(6),
                parseInt($scope.reminder.start.substr(3,2))-1,
                parseInt($scope.reminder.start.substr(0,2)));

            var endDate = new Date($scope.reminder.end.substr(6),
                parseInt($scope.reminder.end.substr(3,2))-1,
                parseInt($scope.reminder.end.substr(0,2)));

            if ((isThisADate(startDate)&&
                (isThisADate(endDate)) &&
                ($scope.reminder.frequency != ''))) {

                if (reminders.getLabReminder() == null) {
                    var newReminder = new Reminder($scope.USUBJID);
                    newReminder.SUBJID = $scope.SUBJID;
                    newReminder.REMINDERSTDTC = startDate;
                    newReminder.REMINDERENDTC = endDate;

                    var secondsInADay = 86400;
                    switch ($scope.reminder.frequency) {
                        case ('Once/ Week'): {
                            newReminder.REMINDERFREQUENCY = secondsInADay * 7;
                            break;
                        }

                        case ('Once/ Month'): {
                            newReminder.REMINDERFREQUENCY = secondsInADay * 30.5;
                            break;
                        }

                        case ('Twice/ Month'): {
                            newReminder.REMINDERFREQUENCY = secondsInADay * (30.5/2);
                            break;
                        }

                        case ('Once/ Year'): {
                            newReminder.REMINDERFREQUENCY = secondsInADay * 365;
                            break;
                        }

                        case ('Twice/ Year'): {
                            newReminder.REMINDERFREQUENCY = secondsInADay * (365/2);
                            break;
                        }

                    }

                    newReminder.REMINDERCATEGORY = "LB";
                    newReminder.REMINDERNOTES = $scope.reminder.notes;
                    //console.log(newReminder);
                    reminders.saveLabReminder(newReminder);

                }
            }
        }
        // if reminder == off
        else {
            if (reminders.getLabReminder() != null)
                reminders.deleteReminders();
                clearFields();
                reminders.deleteLabReminder($scope.USUBJID);
        }
    }

    $scope.editReminder = function (fieldName) {
        if (reminders.getLabReminder() != null) {

            var fieldValue = '';
            if (fieldName == 'REMINDERSTDTC') {
                fieldValue =new Date($scope.reminder.start.substr(6),
                    parseInt($scope.reminder.start.substr(3,2))-1,
                    parseInt($scope.reminder.start.substr(0,2)));

                reminders.getLabReminder().REMINDERSTDTC = fieldValue;
            }
            else if (fieldName == 'REMINDERENDTC') {
                fieldValue =new Date($scope.reminder.end.substr(6),
                    parseInt($scope.reminder.end.substr(3,2))-1,
                    parseInt($scope.reminder.end.substr(0,2)));
                reminders.getLabReminder().REMINDERENDTC = fieldValue;

            }
            else if (fieldName == 'REMINDERFREQUENCY') {
                var secondsInADay = 86400;
                switch ($scope.reminder.frequency) {
                    case ('Once/ Week'): {
                        fieldValue = secondsInADay * 7;
                        break;
                    }

                    case ('Once/ Month'): {
                        fieldValue = secondsInADay * 30.5;
                        break;
                    }

                    case ('Twice/ Month'): {
                        fieldValue = secondsInADay * (30.5/2);
                        break;
                    }

                    case ('Once/ Year'): {
                        fieldValue = secondsInADay * 365;
                        break;
                    }

                    case ('Twice/ Year'): {
                        fieldValue = secondsInADay * (365/2);
                        break;
                    }

                }
                reminders.getLabReminder().REMINDERFREQUENCY = fieldValue;
            }
            else if (fieldName == 'REMINDERNOTES') {
                fieldValue = $scope.reminder.notes;
                reminders.getLabReminder().REMINDERNOTES = fieldValue;

            }

            if (fieldValue != '') {
                reminders.editLabReminder(reminders.getLabReminder(), fieldName, fieldValue);
            }
        }
    }

    var dayMonthYear = angular.element(document.querySelectorAll('.input-daterange'));
    dayMonthYear.datepicker({
        format: "dd/mm/yyyy",
        endDate: currentDate.getFullYear().toString(),
        startView: 1,
        orientation: "auto",
        autoclose: true,
        todayHighlight: true
    });

})

reminderModule.directive('reminderEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'scripts/js/communication/reminder.html'
    };
})
/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 26/07/16
 * Time: 15:52
 * To change this template use File | Settings | File Templates.
 */
