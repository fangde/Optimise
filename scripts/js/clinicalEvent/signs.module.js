/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 31/03/16
 * Time: 11:20
 * To change this template use File | Settings | File Templates.
 */

var signsModule = angular.module('Optimise.signs',[]);

signsModule.directive('relapseSigns', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'scripts/js/clinicalEvent/relapseSigns.html',
        controller: 'relapseSignsCtrl'
    };
});

signsModule.directive('visitSigns', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'scripts/js/clinicalEvent/visitSigns.html',
        controller: 'visitSignsCtrl'
    };
});

signsModule.factory('signVocab', function() {
    var signTerms = {};

    signTerms['higherFunction.informationProcessingSpeed']={CETERM: 'Information processing speed', CEBODSYS:''};
    signTerms['higherFunction.executiveFunctions']={CETERM: 'Executive functions', CEBODSYS:''};
    signTerms['higherFunction.memory']={CETERM: 'Memory', CEBODSYS:''};
    signTerms['higherFunction.verbalFluency']={CETERM: 'Verbal fluency', CEBODSYS:''};
    signTerms['higherFunction.depression']={CETERM: 'Depression', CEBODSYS:''};
    signTerms['higherFunction.seizure']={CETERM: 'Seizure', CEBODSYS:''};

    signTerms['cranial.redDesaturation']={CETERM: 'Red desaturation', CEBODSYS:'Eye'};
    signTerms['cranial.fieldDefect']={CETERM: 'Field defect', CEBODSYS:'Eye'};
    signTerms['cranial.ptosis']={CETERM: 'Ptosis', CEBODSYS:''};
    signTerms['cranial.oscillopia']={CETERM: 'Oscillopia', CEBODSYS:''};
    signTerms['cranial.sixthNervePalsy']={CETERM: 'Sixth nerve palsy', CEBODSYS:''};
    signTerms['cranial.fourthNervePalsy']={CETERM: 'Fourth nerve palsy', CEBODSYS:''};
    signTerms['cranial.thirdNervePalsy']={CETERM: 'Third nerve palsy', CEBODSYS:''};
    signTerms['cranial.dysarthria']={CETERM: 'Dysarthria', CEBODSYS:''};
    signTerms['cranial.dysphagia']={CETERM: 'Dysphagia', CEBODSYS:''};
    signTerms['cranial.vertigo']={CETERM: 'Vertigo', CEBODSYS:''};
    signTerms['cranial.trigeminalNeuralgia']={CETERM: 'Trigeminal neuralgia', CEBODSYS:''};
    signTerms['cranial.facialHypoesthsia']={CETERM: 'Facial hypoesthesia', CEBODSYS:'Face'};
    signTerms['cranial.atypicalFacialPain']={CETERM: 'Atypical facial pain', CEBODSYS:'Face'};
    signTerms['cranial.trigeminalPalsy']={CETERM: 'Trigeminal palsy', CEBODSYS:''};
    signTerms['cranial.hearingLoss']={CETERM: 'Hearing loss', CEBODSYS:''};


    signTerms['motor.weakness.upper']={CETERM: 'Weakness', CEBODSYS:'Upper Limbs'};
    signTerms['motor.weakness.lower']={CETERM: 'Weakness', CEBODSYS:'Lower Limbs'};
    signTerms['motor.spasticity.upper']={CETERM: 'Spasticity', CEBODSYS:'Upper Limbs'};
    signTerms['motor.spasticity.lower']={CETERM: 'Spasticity', CEBODSYS:'Lower Limbs'};

    signTerms['motor.tendonReflex.hyperreflexia.biceps.right']={CETERM: 'Hyperreflexia', CEBODSYS:'Biceps', CELAT:'right'};
    signTerms['motor.tendonReflex.hyperreflexia.biceps.left']={CETERM: 'Hyperreflexia', CEBODSYS:'Biceps', CELAT:'left'};
    signTerms['motor.tendonReflex.hyperreflexia.patella.right']={CETERM: 'Hyperreflexia', CEBODSYS:'Patella', CELAT:'right'};
    signTerms['motor.tendonReflex.hyperreflexia.patella.left']={CETERM: 'Hyperreflexia', CEBODSYS:'Patella', CELAT:'left'};
    signTerms['motor.tendonReflex.hyperreflexia.ankle.right']={CETERM: 'Hyperreflexia', CEBODSYS:'Ankle', CELAT:'right'};
    signTerms['motor.tendonReflex.hyperreflexia.ankle.left']={CETERM: 'Hyperreflexia', CEBODSYS:'Ankle', CELAT:'left'};

    signTerms['motor.tendonReflex.hyporeflexia.biceps.right']={CETERM: 'Hyporeflexia', CEBODSYS:'Biceps', CELAT:'right'};
    signTerms['motor.tendonReflex.hyporeflexia.biceps.left']={CETERM: 'Hyporeflexia', CEBODSYS:'Biceps', CELAT:'left'};
    signTerms['motor.tendonReflex.hyporeflexia.patella.right']={CETERM: 'Hyporeflexia', CEBODSYS:'Patella', CELAT:'right'};
    signTerms['motor.tendonReflex.hyporeflexia.patella.left']={CETERM: 'Hyporeflexia', CEBODSYS:'Patella', CELAT:'left'};
    signTerms['motor.tendonReflex.hyporeflexia.ankle.right']={CETERM: 'Hyporeflexia', CEBODSYS:'Ankle', CELAT:'right'};
    signTerms['motor.tendonReflex.hyporeflexia.ankle.left']={CETERM: 'Hyporeflexia', CEBODSYS:'Ankle', CELAT:'left'};

    signTerms['motor.tremor.postural.upper']={CETERM: 'Postural Tremor', CEBODSYS:'Upper Limbs'};
    signTerms['motor.tremor.intention.upper']={CETERM: 'Intention Tremor', CEBODSYS:'Upper Limbs'};

    signTerms['cerebellar.ataxia.upper']={CETERM: 'Ataxia', CEBODSYS:'Upper Limbs'};
    signTerms['cerebellar.ataxia.lower']={CETERM: 'Ataxia', CEBODSYS:'Lower Limbs'};
    signTerms['cerebellar.ataxia.trunk']={CETERM: 'Ataxia', CEBODSYS:'Trunk'};

    signTerms['somatosensory.dysesthesia.upper']={CETERM: 'Dysesthesia', CEBODSYS:'Upper Limbs'};
    signTerms['somatosensory.dysesthesia.lower']={CETERM: 'Dysesthesia', CEBODSYS:'Lower Limbs'};
    signTerms['somatosensory.dysesthesia.trunk']={CETERM: 'Dysesthesia', CEBODSYS:'Trunk'};
    signTerms['somatosensory.anesthesia.upper']={CETERM: 'Anesthesia', CEBODSYS:'Upper Limbs'};
    signTerms['somatosensory.anesthesia.lower']={CETERM: 'Anesthesia', CEBODSYS:'Lower Limbs'};
    signTerms['somatosensory.anesthesia.trunk']={CETERM: 'Anesthesia', CEBODSYS:'Trunk'};

    signTerms['mobility']={CETERM: 'Mobility', CEBODSYS:''};
    signTerms['maximumDistance']={CETERM: 'Maximum Distance', CEBODSYS:''};

    signTerms.getTerm = function(modelName) {
        //console.log(modelName);
        return signTerms[modelName];
    }

    signTerms.getScopeVariable = function(CETERM, CEBODYSYS, CELAT, CESEV) {
        var theKey = '';
        angular.forEach(signTerms, function(value, key) {
            if ((value.CETERM == CETERM)&&(value.CEBODSYS == CEBODYSYS)) {
                if (CESEV == "")
                    theKey = key;
                else {
                    if (key.indexOf(CELAT.toLowerCase())>-1) {
                        theKey = key;
                    }
                }
            }
        });
        return theKey;
    }

    return signTerms;
});

signsModule.service('signs', function(clinicalEvents, clinicalEvent) {
    var signDate = null;
    var USUBJID = '';

    var setDate = function(newDate) {
        signDate = newDate;
        //console.log("signsDate"+signDate.toLocaleString());
        //clinicalEvents.printEvents();
    }

    var setUSUBJID = function(newUSUBJID) {
        USUBJID = newUSUBJID;
        //console.log(USUBJID);
    }

    var editEvent = function(aSign, CELAT) {
        if (CELAT == false) {  //if this symptom is to be unchecked
            clinicalEvents.deleteEvent(aSign);
        } else {                // else change laterality
            aSign.CELAT = CELAT;
            clinicalEvents.editEvent(aSign, 'CELAT', CELAT);
        }
    }

    var createEvent = function(CETERM, CEBODSYS, CELAT, useRelapseGrpID) {
        var newSign = new clinicalEvent(USUBJID, CETERM, 'Sign');
        newSign.CESTDTC = signDate;
        newSign.CEBODSYS = CEBODSYS;
        newSign.CELAT = CELAT;

        if (useRelapseGrpID){ // a relapse symptom, shares same grpid with relapse event
            var event = clinicalEvents.getCurrentEvent();
            if ((event!= null)&&(event.length > 0)) {
                newSign.CEGRPID = event[0].CEGRPID;
            } else {
                console.log("associating symptom with a non-event")
            }
        }

        clinicalEvents.addEvent(newSign);
    }

    var createEventSev = function(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID) {
        var newSign = new clinicalEvent(USUBJID, CETERM, 'Sign');
        newSign.CESTDTC = signDate;
        newSign.CEBODSYS = CEBODSYS;
        newSign.CELAT = CELAT;
        newSign.CESEV = CESEV;
        if (useRelapseGrpID){ // a relapse symptom, shares same grpid with relapse event
            var event = clinicalEvents.getCurrentEvent();
            if ((event!= null)&&(event.length > 0)) {
                newSign.CEGRPID = event[0].CEGRPID;
            } else {
                console.log("associating sign with a non-event")
            }
        }
        clinicalEvents.addEvent(newSign);
    }

    var editSign = function(CETERM, CEBODSYS, CELAT, useRelapseGrpID) {
        if ((signDate!= null) && (USUBJID!= '')){
            var signsOnDate = clinicalEvents.getEventByTermBodsysOnDate('Sign', CETERM, CEBODSYS, signDate);

            if (signsOnDate.length > 0){ // if symptom already recorded on this day
                // relapse symptom, visit symptom already recorded
                // -> create new relapse symptom
                if ((useRelapseGrpID)&&(signsOnDate[0].CEGRPID==-1)) {
                    createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
                }
                // visit symptom, relapse symptom already recorded
                // -> create new symptom
                else if ((useRelapseGrpID==false)&&(signsOnDate[0].CEGRPID!=-1)) {
                    createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
                }
                // relapse symptom, relapse symptom already recorded
                // -> create new symptom
                else if ((useRelapseGrpID)&&(signsOnDate[0].CEGRPID!=-1)) {
                    editEvent(signsOnDate[0], CELAT);
                }
                // visit symptom, visit symptom already recorded
                // -> edit
                else if ((useRelapseGrpID==false)&&(signsOnDate[0].CEGRPID==-1)) {
                    editEvent(signsOnDate[0], CELAT);
                }
                else {
                    console.log("Error in recording symptoms")
                }

            }
            else {
                createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
            }

//            if (signsOnDate.length > 0){ // if sign already recorded
//                if (CELAT == false) {  //if this sign is to be unchecked
//                    clinicalEvents.deleteEvent(signsOnDate[0]);
//                } else {                // else change laterality
//                    signsOnDate[0].CELAT = CELAT;
//                    clinicalEvents.editEvent(signsOnDate[0], 'CELAT', CELAT);
//                }
//            }
//            else {
//                var newSign = new clinicalEvent(USUBJID, CETERM, 'Sign');
//                newSign.CESTDTC = signDate;
//                newSign.CEBODSYS = CEBODSYS;
//                newSign.CELAT = CELAT;
//
//                if (useRelapseGrpID){ // a relapse symptom, shares same grpid with relapse event
//                    var event = clinicalEvents.getCurrentEvent();
//
//                    if ((event!= null)&&(event.length > 0)) {
//                        newSign.CEGRPID = event[0].CEGRPID;
//                    } else {
//                        console.log("associating sign with a non-event")
//                    }
//                }
//
//                clinicalEvents.addEvent(newSign);
//            }
            clinicalEvents.printEvents();
        }
        else {
            console.log("failed to add sign");
            console.log("signsDate"+signDate.toLocaleString());
            console.log(USUBJID);
        }
    }

    var editSignSev = function(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID) {

        if ((signDate!= null) && (USUBJID!= '')){
            var signsOnDate = clinicalEvents.getEventByTermBodsysOnDate('Sign', CETERM, CEBODSYS, signDate);

            if (signsOnDate.length > 0){
                var edited = false;
                for (var lat = 0; lat < signsOnDate.length; lat++){
                    if (signsOnDate[lat].CELAT == CELAT) {

                        signsOnDate[lat].CESEV= CESEV;

                        if ((useRelapseGrpID)&&(signsOnDate[0].CEGRPID==-1)) {
                            createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
                        }
                        // visit symptom, relapse symptom already recorded
                        // -> create new symptom
                        else if ((useRelapseGrpID==false)&&(signsOnDate[0].CEGRPID!=-1)) {
                            createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
                        }
                        // relapse sign, relapse sign already recorded
                        // -> create new symptom
                        else if ((useRelapseGrpID)&&(signsOnDate[0].CEGRPID!=-1)) {
                            //editEvent(signsOnDate[0], CELAT);
                            var edited = false;
                            for (var lat = 0; lat < signsOnDate.length; lat++){
                                if (signsOnDate[lat].CELAT == CELAT) {
                                    signsOnDate[lat].CESEV= CESEV;
                                    clinicalEvents.editEvent(signsOnDate[lat], 'CESEV', CESEV);
                                    edited=true;
                                }
                            }
                            if (!edited) {
                                createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
                            }
                        }
                        // visit symptom, visit symptom already recorded
                        // -> edit
                        else if ((useRelapseGrpID==false)&&(signsOnDate[0].CEGRPID==-1)) {
                            var edited = false;
                            for (var lat = 0; lat < signsOnDate.length; lat++){
                                if (signsOnDate[lat].CELAT == CELAT) {
                                    signsOnDate[lat].CESEV= CESEV;
                                    clinicalEvents.editEvent(signsOnDate[lat], 'CESEV', CESEV);
                                    edited=true;
                                }
                            }
                            if (!edited) {
                                createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
                            }
                        }
                        else {
                            console.log("Error in recording signs")
                        }

//                        clinicalEvents.editEvent(signsOnDate[lat], 'CESEV', CESEV);
//                        edited=true;
                    }
                }
                if (!edited) {
                    createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
                }
            }
            else {
                createEventSev(CETERM, CEBODSYS, CELAT, CESEV, useRelapseGrpID);
            }

            clinicalEvents.printEvents();
        }
        else {
            console.log("failed to add sign");
            console.log("signsDate"+signDate.toLocaleString());
            console.log(USUBJID);
        }
    }

    var getSigns = function() {
        if ((signDate!= null) && (USUBJID!= '')){
            var signsOnDate = clinicalEvents.getEventsFromCategoryAndDate('Sign', signDate);
            return signsOnDate;
        }
        else {
            console.log("failed to find signs");
            console.log("signsDate"+signDate.toLocaleString());
            console.log(USUBJID);
        }
        return [];
    }

    return {
        setDate: setDate,
        setUSUBJID: setUSUBJID,
        editSign: editSign,
        getSigns: getSigns,
        editSignSev: editSignSev
    }
});


signsModule.controller('relapseSignsCtrl', function ($rootScope, $parse, $scope, signs, signVocab) {

    var useRelapseGrpID = true;

    $scope.editSign = function(modelName) {
        var CETERM = signVocab.getTerm(modelName).CETERM;//signTerms[modelName].CETERM;
        var CEBODSYS = signVocab.getTerm(modelName).CEBODSYS;
        //console.log(modelName);
        if (modelName.indexOf('right')>-1){
            var model = $parse(modelName);
            var CESEV = model($scope);
            signs.editSignSev(CETERM, CEBODSYS, 'Right', CESEV, useRelapseGrpID);
        } else if (modelName.indexOf('left')>-1){
            var model = $parse(modelName);
            var CESEV = model($scope);
            signs.editSignSev(CETERM, CEBODSYS, 'Left', CESEV, useRelapseGrpID);
        }
        else {
            var model = $parse(modelName);
            var CELAT = model($scope);
            console.log(CETERM)
            console.log(CEBODSYS)
            console.log(CELAT)
            signs.editSign(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
        }
    }


    $rootScope.displayRelapseSigns = function() {
        clearFields();
        var currentSigns = signs.getSigns();
        for (var s = 0; s < currentSigns.length; s++) {
            if (currentSigns[s].CEGRPID != -1) {
                var modelName = signVocab.getScopeVariable(currentSigns[s].CETERM, currentSigns[s].CEBODSYS, currentSigns[s].CELAT, currentSigns[s].CESEV);
                var model = $parse(modelName);
                if (currentSigns[s].CESEV != "") {
                    if (modelName.indexOf(currentSigns[s].CELAT.toLowerCase())>-1)
                        model.assign($scope, currentSigns[s].CESEV);
                } else {
                    model.assign($scope, currentSigns[s].CELAT);
                }
            }
        }
    }

    $rootScope.clearRelapseSignFields = function() {
        clearFields();
    }

    var clearFields = function () {
        angular.forEach(signVocab, function(value, key) {
            var model = $parse(key);
            model.assign($scope,'');
        });
    }
})

signsModule.controller('visitSignsCtrl', function ($rootScope, $parse, $scope, signs, signVocab) {

    var useRelapseGrpID = false;

    $scope.editSign = function(modelName) {
        var CETERM = signVocab.getTerm(modelName).CETERM;//signTerms[modelName].CETERM;
        var CEBODSYS = signVocab.getTerm(modelName).CEBODSYS;
        console.log(modelName);
        if (modelName.indexOf('right')>-1){
            var model = $parse(modelName);
            var CESEV = model($scope);
            signs.editSignSev(CETERM, CEBODSYS, 'Right', CESEV, useRelapseGrpID);
        } else if (modelName.indexOf('left')>-1){
            var model = $parse(modelName);
            var CESEV = model($scope);
            signs.editSignSev(CETERM, CEBODSYS, 'Left', CESEV, useRelapseGrpID);
        }
        else {
            var model = $parse(modelName);
            var CELAT = model($scope);
            signs.editSign(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
        }
    }

    $rootScope.displayVisitSigns = function() {
        clearFields();
        var currentSigns = signs.getSigns();
        for (var s = 0; s < currentSigns.length; s++) {
            if (currentSigns[s].CEGRPID == -1) {
                var modelName = signVocab.getScopeVariable(currentSigns[s].CETERM, currentSigns[s].CEBODSYS, currentSigns[s].CELAT, currentSigns[s].CESEV);
                var model = $parse(modelName);
                if (currentSigns[s].CESEV != "") {
                    if (modelName.indexOf(currentSigns[s].CELAT.toLowerCase())>-1)
                        model.assign($scope, currentSigns[s].CESEV);
                } else {
                    model.assign($scope, currentSigns[s].CELAT);
                }
            }
        }
    }

    $rootScope.clearVisitSignFields = function() {
        clearFields();
    }

    var clearFields = function() {
        angular.forEach(signVocab, function(value, key) {
            var model = $parse(key);
            model.assign($scope,'');
        });
    }
})



