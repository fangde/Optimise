var symptomsModule = angular.module('Optimise.symptoms',['ui.bootstrap']);

symptomsModule.directive('visitSymptoms', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        scope:{},
        templateUrl:'scripts/js/clinicalEvent/visitSymptoms.html',
        controller: 'visitSymptomsCtrl'
    };
});

symptomsModule.directive('relapseSymptoms', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        scope:{},
        templateUrl:'scripts/js/clinicalEvent/relapseSymptoms.html',
        controller: 'relapseSymptomsCtrl'
    };
});


symptomsModule.factory('symptomVocab', function() {
    var symptomTerms = {};

    symptomTerms['higherFunction.cognitiveProblems']={CETERM: 'Cognitive problems', CEBODSYS:''};
    symptomTerms['higherFunction.emotionalLability']={CETERM: 'Emotional lability', CEBODSYS:''};
    symptomTerms['higherFunction.depression']={CETERM: 'Depression', CEBODSYS:''};
    symptomTerms['higherFunction.fatigue']={CETERM: 'Fatigue', CEBODSYS:''};
    symptomTerms['higherFunction.seizure']={CETERM: 'Seizure', CEBODSYS:''};

    symptomTerms['cranial.blurredVision']={CETERM: 'Blurred vision', CEBODSYS:''};
    symptomTerms['cranial.greying']={CETERM: 'Greying of vision in one eye', CEBODSYS:''};
    symptomTerms['cranial.fieldDefect']={CETERM: 'Field defect', CEBODSYS:''};
    symptomTerms['cranial.blindness']={CETERM: 'Blindness', CEBODSYS:''};
    symptomTerms['cranial.uncontrolledEyeMovements']={CETERM: 'Uncontrolled eye movements', CEBODSYS:''};
    symptomTerms['cranial.dysarthria']={CETERM: 'Dysarthria', CEBODSYS:''};
    symptomTerms['cranial.dysphagia']={CETERM: 'Dysphagia', CEBODSYS:''};
    symptomTerms['cranial.dizziness']={CETERM: 'Dizziness', CEBODSYS:''};
    symptomTerms['cranial.vertigo']={CETERM: 'Vertigo', CEBODSYS:''};
    symptomTerms['cranial.facialPain']={CETERM: 'Facial pain', CEBODSYS:''};
    symptomTerms['cranial.facialHypoesthesia']={CETERM: 'Facial hypoesthesia', CEBODSYS:''};
    symptomTerms['cranial.facialWeakness']={CETERM: 'Facial weakness', CEBODSYS:''};

    symptomTerms['motor.weakness.upper']={CETERM: 'Weakness', CEBODSYS:'Upper Limbs'};
    symptomTerms['motor.weakness.lower']={CETERM: 'Weakness', CEBODSYS:'Lower Limbs'};
    symptomTerms['motor.difficultWalking']={CETERM: 'Difficulty walking', CEBODSYS:''};
    symptomTerms['motor.tremor.upper']={CETERM: 'Tremor', CEBODSYS:'Upper Limbs'};
    symptomTerms['motor.tremor.lower']={CETERM: 'Tremor', CEBODSYS:'Lower Limbs'};

    symptomTerms['somatosensory.pain.upper']={CETERM: 'Pain', CEBODSYS:'Upper Limbs'};
    symptomTerms['somatosensory.pain.lower']={CETERM: 'Pain', CEBODSYS:'Lower Limbs'};
    symptomTerms['somatosensory.pain.trunk']={CETERM: 'Pain', CEBODSYS:'Trunk'};
    symptomTerms['somatosensory.paresthesia.upper']={CETERM: 'Paresthesia', CEBODSYS:'Upper Limbs'};
    symptomTerms['somatosensory.paresthesia.lower']={CETERM: 'Paresthesia', CEBODSYS:'Lower Limbs'};
    symptomTerms['somatosensory.paresthesia.trunk']={CETERM: 'Paresthesia', CEBODSYS:'Trunk'};
    symptomTerms['somatosensory.dysesthesia.upper']={CETERM: 'Dysesthesia', CEBODSYS:'Upper Limbs'};
    symptomTerms['somatosensory.dysesthesia.lower']={CETERM: 'Dysesthesia', CEBODSYS:'Lower Limbs'};
    symptomTerms['somatosensory.dysesthesia.trunk']={CETERM: 'Dysesthesia', CEBODSYS:'Trunk'};
    symptomTerms['somatosensory.anesthesia.upper']={CETERM: 'Anesthesia', CEBODSYS:'Upper Limbs'};
    symptomTerms['somatosensory.anesthesia.lower']={CETERM: 'Anesthesia', CEBODSYS:'Lower Limbs'};
    symptomTerms['somatosensory.anesthesia.trunk']={CETERM: 'Anesthesia', CEBODSYS:'Trunk'};
    symptomTerms['somatosensory.pruritis.upper']={CETERM: 'Pruritis', CEBODSYS:'Upper Limbs'};
    symptomTerms['somatosensory.pruritis.lower']={CETERM: 'Pruritis', CEBODSYS:'Lower Limbs'};
    symptomTerms['somatosensory.pruritis.trunk']={CETERM: 'Pruritis', CEBODSYS:'Trunk'};
    symptomTerms['somatosensory.lhermitte']={CETERM: 'Lhermitte sign', CEBODSYS:''};
    symptomTerms['somatosensory.heatIntolerance']={CETERM: 'Heat intolerance', CEBODSYS:''};

    symptomTerms['autonomic.bladderUrgency']={CETERM: 'Bladder urgency', CEBODSYS:''};
    symptomTerms['autonomic.bladderFrequency']={CETERM: 'Bladder frequency', CEBODSYS:''};
    symptomTerms['autonomic.bladderIncontinence']={CETERM: 'Bladder incontinence', CEBODSYS:''};
    symptomTerms['autonomic.constipation']={CETERM: 'Constipation', CEBODSYS:''};
    symptomTerms['autonomic.bowelIncontinence']={CETERM: 'Bowel incontinence', CEBODSYS:''};
    symptomTerms['autonomic.sexualFunction']={CETERM: 'Problems with sexual function', CEBODSYS:''};

    symptomTerms.getTerm = function(modelName) {
        return symptomTerms[modelName];
    }

    symptomTerms.getScopeVariable = function(CETERM, CEBODYSYS) {
        var theKey = "";
        angular.forEach(symptomTerms, function(value, key) {
            if ((value.CETERM == CETERM)&&(value.CEBODSYS == CEBODYSYS)) {
                theKey = key;
            }
        })
        return theKey;

    }

    return symptomTerms;
});

symptomsModule.service('symptoms', function(clinicalEvents, clinicalEvent) {
    var symptomDate = null;
    var USUBJID = '';

    var setDate = function(newDate) {
        symptomDate = newDate;
        //console.log("symptomsDate"+symptomDate.toLocaleString());
        //clinicalEvents.printEvents();
    }

    var setUSUBJID = function(newUSUBJID) {
        USUBJID = newUSUBJID;
    }

    var editEvent = function(aSymptom, CELAT) {
        if (CELAT == false) {  //if this symptom is to be unchecked
            clinicalEvents.deleteEvent(aSymptom);
        } else {                // else change laterality
            aSymptom.CELAT = CELAT;
            clinicalEvents.editEvent(aSymptom, 'CELAT', CELAT);
        }
    }

    var createEvent = function(CETERM, CEBODSYS, CELAT, useRelapseGrpID) {
        var newSymptom = new clinicalEvent(USUBJID, CETERM, 'Symptom');
        newSymptom.CESTDTC = symptomDate;
        newSymptom.CEBODSYS = CEBODSYS;
        newSymptom.CELAT = CELAT;

        if (useRelapseGrpID){ // a relapse symptom, shares same grpid with relapse event
            var event = clinicalEvents.getCurrentEvent();
            if ((event!= null)&&(event.length > 0)) {
                newSymptom.CEGRPID = event[0].CEGRPID;
            } else {
                console.log("associating symptom with a non-event")
            }
        }

        clinicalEvents.addEvent(newSymptom);
    }

    var editSymptom = function(CETERM, CEBODSYS, CELAT, useRelapseGrpID) {
        if ((symptomDate!= null) && (USUBJID!= '')){
            var symptomsOnDate = clinicalEvents.getEventByTermBodsysOnDate('Symptom', CETERM, CEBODSYS, symptomDate);

            if (symptomsOnDate.length > 0){ // if symptom already recorded on this day

                // relapse symptom, visit symptom already recorded
                // -> create new relapse symptom
                if ((useRelapseGrpID)&&(symptomsOnDate[0].CEGRPID==-1)) {
                    createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
                }
                // visit symptom, relapse symptom already recorded
                // -> create new symptom
                else if ((useRelapseGrpID==false)&&(symptomsOnDate[0].CEGRPID!=-1)) {
                    createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
                }
                // relapse symptom, relapse symptom already recorded
                // -> create new symptom
                else if ((useRelapseGrpID)&&(symptomsOnDate[0].CEGRPID!=-1)) {
                    editEvent(symptomsOnDate[0], CELAT);
                }
                // visit symptom, visit symptom already recorded
                // -> edit
                else if ((useRelapseGrpID==false)&&(symptomsOnDate[0].CEGRPID==-1)) {
                    editEvent(symptomsOnDate[0], CELAT);
                }
                else {
                    console.log("Error in recording symptoms")
                }

                // relapse symptom, visit symptom already recorded
                // -> create new symptom
                // visit symptom, relapse already recorded
                // -> create new symptom
                // relapse symptom, relapse already recorded
                // -> edit
                // visit symptom, visit symptom already recorded
                // -> edit

            }
            else {
                createEvent(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
            }
            clinicalEvents.printEvents();
        }
        else {
            console.log("failed to add symptom");
            console.log("symptomsDate"+symptomDate.toLocaleString());
            console.log(USUBJID);
        }
    }

    var getSymptoms = function() {
        if ((symptomDate!= null) && (USUBJID!= '')){
            //console.log(symptomDate);
            var symptomsOnDate = clinicalEvents.getEventsFromCategoryAndDate('Symptom', symptomDate);
            //console.log(symptomsOnDate);
            return symptomsOnDate;
        }
        else {
            console.log("failed to find symptoms");
            console.log("symptomsDate"+symptomDate.toLocaleString());
            console.log(USUBJID);
        }
        return [];
    }

    return {
        setDate: setDate,
        setUSUBJID: setUSUBJID,
        editSymptom: editSymptom,
        getSymptoms: getSymptoms
    }
});


symptomsModule.controller('visitSymptomsCtrl', function ($rootScope, $parse, $scope, symptoms, symptomVocab) {

    var useRelapseGrpID = false;

    $scope.editSymptom = function(modelName) {
        var CETERM = symptomVocab.getTerm(modelName).CETERM;//symptomTerms[modelName].CETERM;
        var CEBODSYS = symptomVocab.getTerm(modelName).CEBODSYS;
        var model = $parse(modelName);
        var CELAT = model($scope);

        symptoms.editSymptom(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
    }

    $rootScope.displayVisitSymptoms = function() {
        clearFields();
        var currentSymptoms = symptoms.getSymptoms();
        for (var s = 0; s < currentSymptoms.length; s++) {
            if (currentSymptoms[s].CEGRPID == -1) {
                var modelName = symptomVocab.getScopeVariable(currentSymptoms[s].CETERM, currentSymptoms[s].CEBODSYS);
                var model = $parse(modelName);
                model.assign($scope, currentSymptoms[s].CELAT);
            }
        }
    }

    $rootScope.clearVisitSymptomFields = function() {
        clearFields();
    }

    var clearFields = function() {
        angular.forEach(symptomVocab, function(value, key) {
            var model = $parse(key);
            model.assign($scope,'');
        });
    }
})

symptomsModule.controller('relapseSymptomsCtrl', function ($rootScope, $parse, $scope, symptoms, symptomVocab) {

    var useRelapseGrpID = true;

    $scope.editSymptom = function(modelName) {
        var CETERM = symptomVocab.getTerm(modelName).CETERM;//symptomTerms[modelName].CETERM;
        var CEBODSYS = symptomVocab.getTerm(modelName).CEBODSYS;
        var model = $parse(modelName);
        var CELAT = model($scope);

        symptoms.editSymptom(CETERM, CEBODSYS, CELAT, useRelapseGrpID);
    }

    $rootScope.displayRelapseSymptoms = function() {
        clearFields();
        var currentSymptoms = symptoms.getSymptoms();

        for (var s = 0; s < currentSymptoms.length; s++) {
            if (currentSymptoms[s].CEGRPID != -1) {
                var modelName = symptomVocab.getScopeVariable(currentSymptoms[s].CETERM, currentSymptoms[s].CEBODSYS);
                var model = $parse(modelName);
                model.assign($scope, currentSymptoms[s].CELAT);
            }

        }
    }

    $rootScope.clearRelapseSymptomFields = function() {
        clearFields();
    }

    var clearFields = function () {
        angular.forEach(symptomVocab, function(value, key) {
            var model = $parse(key);
            model.assign($scope,'');
        });
    }
})


