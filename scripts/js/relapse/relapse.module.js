/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 23/01/2015
 * Time: 13:22
 * To change this template use File | Settings | File Templates.
 */

var relapseModule = angular.module('Optimise.relapse',[]);

relapseModule.controller('relapseInfoCtrl', function ($rootScope,
                                                 $scope,
                                                 clinicalEvent,
                                                 clinicalEvents,
                                                 viewService,
                                                 symptoms, signs,
                                                question, questionnaires,
                                                findingAbout, findingsAbout) {


    $scope.USUBJID = '';

    $rootScope.setRelapseUSUBJID = function(USUBJID) {
        $scope.USUBJID = USUBJID;
        symptoms.setUSUBJID($scope.USUBJID);
        signs.setUSUBJID($scope.USUBJID);
    }


    $scope.showThisContent = function() {
        if (viewService.getView().Section=='Relapse')
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    var currentDate = new Date();

    var monthYear = angular.element(document.querySelectorAll('.DTC_MonthYear'));
    monthYear.datepicker({
        format: "mm/yyyy",
        endDate: currentDate.getFullYear().toString(),
        minViewMode: 1,
        startView: 1,
        orientation: "top left",
        autoclose: true,
        todayHighlight: true
    });

    /*
    $scope.relapseDuration = function() {
        if (($scope.CEENDTC!=null)&&($scope.CESTDTC!=null)){
            if (($scope.CEENDTC != '') && ($scope.CESTDTC != ''))
            {
                var dayInMilliseconds=1000*60*60*24;
                var dateEnd = $scope.CEENDTC.getTime();
                var dateStart = $scope.CESTDTC.getTime();
                var duration = Math.round((dateEnd-dateStart)/dayInMilliseconds);
                if (duration == 1)
                    return duration.toString()+ " day";
                else
                    return duration.toString()+ " days";
            }
        }
        return '';
    };
    */

    $scope.getDisabledFields = function() {
        return viewService.getView().DisableInputFields;
    }

//    $scope.preventAddBodySys = function() {
//        return $scope.datesValidated;
//    }

    $scope.datesValidated = false;

    $rootScope.setNewRelapseFields = function() {
        $scope.datesValidated = false;
        clinicalEvents.clearEvent();
        clearFields();
    };

    var getDuration = function (CESTDTC, CEENDTC) {
        var days = (CEENDTC-CESTDTC)/(1000*60*60*24);
        return days/7;
    }

    $rootScope.displayRelapse = function() {
        clearFields();
        var currentRelapse = clinicalEvents.getCurrentEvent();  // get relapse, with affected functional systems

        if ((currentRelapse!= null)&&(currentRelapse.length > 0))
        {
            $scope.CESTDTC = currentRelapse[0].CESTDTC;
            $scope.datesValidated = true;
            $scope.CESTDTC_displayDate = parseInt($scope.CESTDTC.getMonth()+1)+"/"+$scope.CESTDTC.getFullYear();

            $scope.duration = getDuration(currentRelapse[0].CESTDTC, currentRelapse[0].CEENDTC);

            $scope.CESEV = currentRelapse[0].CESEV;
            $scope.CEOUT = currentRelapse[0].CEOUT;

            symptoms.setDate($scope.CESTDTC);
            signs.setDate($scope.CESTDTC);

            for (var bodSys = 0; bodSys < currentRelapse.length; bodSys++)
            {
                switch(currentRelapse[bodSys].CEBODSYS) {
                    case 'Pyramidal Tract':
                        $scope.pyramidalTract = true;
                        break;
                    case 'Cerebellum':
                        $scope.cerebellum = true;
                        break;
                    case 'Brain Stem':
                        $scope.brainStem = true;
                        break;
                    case 'Sensory':
                        $scope.sensory = true;
                        break;
                    case 'Bowel Bladder':
                        $scope.bowelBladder = true;
                        break;
                    case 'Visual':
                        $scope.visual = true;
                        break;
                    case 'Higher Function':
                        $scope.higherFunction = true;
                        break;
                    default:
                        $scope.otherBodySys = currentRelapse[bodSys].CEBODSYS;
                }
            }

            var currentADL = findingsAbout.getFindingsByLNKID(currentRelapse[0].CELNKID);
            if ((currentADL != null)&&(currentADL.length > 0))
                $scope.adlScore = currentADL[0].FAORES;
        }
    }

    var clearFields = function() {
        $scope.CESTDTC = "";
        $scope.CESTDTC_displayDate="";
        $scope.duration = "";
        $scope.CESEV = "";
        $scope.CEOUT = "";
        $scope.pyramidalTract = false;
        $scope.cerebellum = false;
        $scope.brainStem = false;
        $scope.bowelBladder = false;
        $scope.sensory = false;
        $scope.visual = false;
        $scope.higherFunction = false;
        $scope.adlScore = '';
    }

    /*
    var editQuestionProperties = function(ADL, resValue) {
        questionnaires.editQuestion(ADL, resValue);
    }*/

//    $scope.addADL = function() {
//        var visitDate = generateCESTDTC();
//        console.log(visitDate);
//        var ADLResOnDate = questionnaires.getQuestionByTest('Activities of Daily Living', visitDate);    // get questions taken on this date
//        if (ADLResOnDate != null) {  // if existing record
//            //editQuestionProperties(ADLResOnDate, $scope.adlScore);
//            questionnaires.editQuestion(ADLResOnDate, 'QSSTRESC', $scope.adlScore);
//        }
//        else {
//            var newQuestion = new question($scope.USUBJID, 'Activities of Daily Living');
//            newQuestion.QSTEST = 'Activities of Daily Living';
//            newQuestion.QSSTRESC = $scope.adlScore;
//            questionnaires.addQuestion(visitDate, newQuestion);
//        }
//        questionnaires.printQuestions();
//    }

    $scope.editRelapseFinding = function () {

        var ce = clinicalEvents.getCurrentEvent();
        if ((ce != null) && (ce.length > 0)){
            var findings = findingsAbout.getFindingsByLNKID(ce[0].CELNKID);
            for (var f = 0; f < findings.length; f++) {
                findings[f].FAORES = $scope.adlScore;
                findingsAbout.editFinding(findings[f]);
            }
        }
    }

    var editRelapseProperties = function(inFunctionalSys, resName) {
        switch (resName) {
            case ('CESEV'): {
                inFunctionalSys.CESEV = $scope.CESEV;
                inFunctionalSys.displayLabel = $scope.CESEV;
                clinicalEvents.editEvent(inFunctionalSys, resName, $scope.CESEV);
                clinicalEvents.editEvent(inFunctionalSys, 'displayLabel', $scope.CESEV);
                break;
            };
            case ('CEOUT'): {
                inFunctionalSys.CEOUT = $scope.CEOUT;
                clinicalEvents.editEvent(inFunctionalSys, resName, $scope.CEOUT);
                break;
            };
            case ('CESTDTC'): {
                inFunctionalSys.CESTDTC = generateCESTDTC();
                //console.log(inFunctionalSys.CESTDTC)
                clinicalEvents.editEvent(inFunctionalSys, resName, inFunctionalSys.CESTDTC);
                break;
            };
            case ('CEENDTC'): {
                inFunctionalSys.CEENDTC = generateCEENDTC(inFunctionalSys.CESTDTC);
                clinicalEvents.editEvent(inFunctionalSys, resName, inFunctionalSys.CEENDTC);
                break;
            };
        };

        inFunctionalSys.displayLabel = inFunctionalSys.CESEV;
        inFunctionalSys.displayDate = $scope.CESTDTC_displayDate;
    }

    $scope.enableSeverityOutcomeCapture = function() {
        if (($scope.pyramidalTract) || ($scope.cerebellum) || ($scope.brainStem) || ($scope.sensory) || ($scope.bowelBladder) ||
            ($scope.visual) || ($scope.neuropsycho)) {
            return true;
        }
        return false;
    }

    var generateCESTDTC = function() {
        /*
        var year = $scope.CESTDTC_Year;
        var month = "";
        if ($scope.CESTDTC_Month.indexOf("Spring") != -1)
            month = 3;
        else if ($scope.CESTDTC_Month.indexOf("Summer") != -1)
            month = 6;
        else if ($scope.CESTDTC_Month.indexOf("Autumn") != -1)
            month = 9;
        else if ($scope.CESTDTC_Month.indexOf("Winter") != -1)
            month = 0;

        return new Date (year, month, 1);
        */
        //03/2015
        return new Date($scope.CESTDTC_displayDate.substr(3), parseInt($scope.CESTDTC_displayDate.substr(0,2))-1, 1);
    };

    var generateCEENDTC = function(CESTDTC) {
        var today = CESTDTC;
        var tomorrow = new Date(today);
        var durationInDays = Math.ceil($scope.duration*7);
        tomorrow.setDate(today.getDate()+durationInDays);
        return tomorrow;
    }

    $scope.addRelapseProperty = function(propName) {
        var currentCE = clinicalEvents.getCurrentEvent();
        if (currentCE.length > 0) {
            var eventsInGroup = clinicalEvents.getEventsByCatTermAndGroupID(currentCE[0].CECAT, currentCE[0].CETERM, currentCE[0].CEGRPID);
            for (var e = 0; e < eventsInGroup.length; e++) {
                var event = eventsInGroup[e];
                editRelapseProperties(event, propName);
            }
        }
        //clinicalEvents.printEvents();
    }


//    $scope.validateDates = function() {
//        console.log($scope.CESTDTC_displayDate);
//        if ($scope.CESTDTC_displayDate == ''){
//            //alert("Date null");
//            $scope.duration = null;
//            return false;
//        }
//        $scope.datesValidated = true;
//    }

    $rootScope.setNewRelapseDate = function(display, CESTDTC) {
        console.log(CESTDTC);
        $scope.CESTDTC_displayDate = display;
        //$scope.CESTDTC = generateCESTDTC(CESTDTC);
        $scope.CESTDTC = CESTDTC;

        console.log($scope.CESTDTC_displayDate);
        console.log($scope.CESTDTC);
        $scope.datesValidated = true;
    }

    $scope.addEndDate = function() {
        if (isNaN($scope.duration)) {
            $scope.duration = null;
            return false;
        }
        else
        {
            var currentCE = clinicalEvents.getCurrentEvent();
            for (var r = 0; r < currentCE.length; r++)
            {
                var anEvent = currentCE[r];
                editRelapseProperties(anEvent, 'CEENDTC');
            }
        }
    }

    $scope.addRelapse = function(CEBODYSYS, toAdd) {

        var currentCE = clinicalEvents.getCurrentEvent();
        symptoms.setUSUBJID($scope.USUBJID);
        signs.setUSUBJID($scope.USUBJID);

        if (currentCE.length == 0) { // if new relapse
            var newCEGRPID = clinicalEvents.getNewCEGRPID();
            var newEvent = addEvent(CEBODYSYS, newCEGRPID);
            clinicalEvents.setEvent(newEvent);
            //console.log(clinicalEvents.getCurrentEvent());
        }
        else {  // if there are existing events in this relapse
            var currentCEGRPID = currentCE[0].CEGRPID;

            //if (inFunctionalSys != null) {  // if this event already exists
            if (toAdd) { // if functional system is checked
                var newEvent = addEvent(CEBODYSYS, currentCEGRPID);
            }
            else { // if functional system is unchecked
                var inFunctionalSys = clinicalEvents.getEventByBodSys(CEBODYSYS, 'Multiple Sclerosis Relapse', currentCEGRPID);
                clinicalEvents.deleteEvent(inFunctionalSys);
                var eventFromSameRelapse = clinicalEvents.getEventsByCatTermAndGroupID(inFunctionalSys.CECAT, inFunctionalSys.CETERM, currentCEGRPID);
                if (eventFromSameRelapse.length > 0)
                    clinicalEvents.setEvent(eventFromSameRelapse[0]);
                else {
                    clinicalEvents.setEvent([]);
                    $scope.CESEV = '';
                    $scope.CEOUT = '';
                }
            }
        }
        //clinicalEvents.printEvents();
    }

    var addRelapseFinding = function(CE) {
        var aFinding = new findingAbout(CE.USUBJID, CE.CETERM, 'Severity Test', 'Impact on ADL'); // Is it mobility??
        aFinding.FAORES = '';
        aFinding.FADTC = generateCESTDTC();
        aFinding.FALNKID = generateCESTDTC()+" Multiple Sclerosis Relapse";
        findingsAbout.addFinding(aFinding);
//        return aFinding;
    }

    var addEvent = function(CEBODYSYS, CEGRPID) {
        var newEvent = new clinicalEvent($scope.USUBJID, 'Multiple Sclerosis Relapse', 'MS Relapse');
        //editRelapse(newRelapse);
        newEvent.CEBODSYS = CEBODYSYS;
        newEvent.CEGRPID = CEGRPID;
        newEvent.CELNKID = generateCESTDTC()+" Multiple Sclerosis Relapse";

        editRelapseProperties(newEvent, 'CESTDTC');
        editRelapseProperties(newEvent, 'CEENDTC');

        symptoms.setDate(newEvent.CESTDTC);
        signs.setDate(newEvent.CESTDTC);
        if ($scope.CESEV != '') {
            editRelapseProperties(newEvent, 'CESEV');
        }

        if ($scope.CEOUT != '') {
            editRelapseProperties(newEvent, 'CEOUT');
        }

        clinicalEvents.addEvent(newEvent);
        addRelapseFinding(newEvent);
        return newEvent;
    }
})

relapseModule.directive('relapseEntry', function(viewService) {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'scripts/js/relapse/relapse.html',
        controller: function($scope) {
            /*
            $scope.showThisContent = function() {
                if (viewService.getView().Section=='Relapse')
                    return true;
                else
                    return false;
            }
            */
        }
    };
});