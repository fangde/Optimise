var mriModule = angular.module('Optimise.mri',['Optimise.morphology', 'Optimise.procedure', 'Optimise.connectivity']);

mriModule.directive('mriEntry', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        templateUrl:'scripts/js/laboratory/mri.html'
    };
});



mriModule.controller('mriInfoCtrl', function ($scope, $rootScope, $parse, $uibModal, $timeout,
                                        procedures, procedure,
                                        morphologyServices, Morphology, connectionServices) {
    $scope.USUBJID = '';
    $rootScope.setMRIUSUBJID = function(USUBJID, connectToXNAT) {
        $scope.USUBJID = USUBJID;
        if (connectToXNAT)
            getNewProcedures();
    }

    $scope.scans = [];
    $scope.scansTakenDuringExperiment = [];

    var getNewProcedures = function() {
        var XNATData = connectionServices.getImagingExperiments($scope.USUBJID);
        $timeout(function() {
        }, 3000).then(function(){
                XNATData.then(function(data){
                    procedures.syncExperiments(data.experiments, $scope.USUBJID);
                    setScans(data.scans);
                });
            });
    }

    $scope.selectScan = function (){
        //console.log($scope.selectedScan);
        /*
        $scope.imageURL ='https://central.xnat.org'+$scope.selectedScan.thumbnail;
        $scope.downloadURL ='https://central.xnat.org'+$scope.selectedScan.download;
        $scope.dicomURL ='https://central.xnat.org'+$scope.selectedScan.dicom;
        */
        //http://www.optimise-ms.org/api-optimise/xnat/proxy.php
        $scope.imageURL ='http://www.optimise-ms.org/api-optimise/xnat/proxy.php/'+$scope.selectedScan.thumbnail;
        $scope.downloadURL ='http://www.optimise-ms.org/api-optimise/xnat/proxy.php/'+$scope.selectedScan.download;
        //console.log($scope.downloadURL);
        $scope.dicomURL ='http://www.optimise-ms.org/api-optimise/xnat/proxy.php/'+$scope.selectedScan.dicom;
        //console.log($scope.selectedScan);
    };

    var setScans = function(newScans) {
        //console.log(newScans);
        $scope.scans = newScans;
    };

    var setScansTakenDuringExperiment = function () {
        var XNATExperimentID = procedures.getCurrentProcedure().XNATExperimentID;
        $scope.scansTakenDuringExperiment = [];
        for (var s = 0; s < $scope.scans.length; s++) {
            if ($scope.scans[s].uri.indexOf(XNATExperimentID) >-1) {
                $scope.scansTakenDuringExperiment.push($scope.scans[s]);
            }
        }
        setSelectedScan();
    };

    var setSelectedScan = function() {
        //console.log($scope.scansTakenDuringExperiment);
        if ($scope.scansTakenDuringExperiment.length > 0) {
            console.log($scope.scansTakenDuringExperiment[0]);
            $scope.selectedScan = $scope.scansTakenDuringExperiment[0];
            $scope.selectScan();
        }
    }


    //$scope.testIndex = 'Magnetic Resonance Imaging';
    //$scope.imageURL ="https://central.xnat.org/data/experiments/CENTRAL_E07330/scans/7/resources/123229201/files/CENTRAL_E07330_7_qc_t.gif"
    $scope.imageURL ="";
    $scope.downloadURL ="";
    $scope.dicomURL ="";

    $rootScope.displayMRI = function() {
        clearFields();
        var LBDTC = procedures.getCurrentProcedure().PRSTDTC;
        setScansTakenDuringExperiment();
        var morphologicalFindings = morphologyServices.getFindingsByDate(LBDTC.toDateString());
        for (var f = 0; f < morphologicalFindings.length; f++) {
            var moVariables = getImagingMorphologyScopeName(morphologicalFindings[f].MOTEST);
            if (moVariables != null) {
                var modelTestValue = $parse(moVariables.scopeVariable);
                modelTestValue.assign($scope, morphologicalFindings[f].MOORRES);
            }

            var loVariables = getImagingLocalityScopeName(morphologicalFindings[f].MOLOC);
            if (loVariables != null){
                var modelTestValue = $parse(loVariables.scopeVariable);
                modelTestValue.assign($scope, morphologicalFindings[f].MOLOC);
            }
        }
    }

    var getImagingMorphologyScopeName = function(MOTEST) {
        var moNames = [{scopeVariable: 'GDLesions', testName: "Gd Enhancing Lesions"},
            {scopeVariable: 'T1Lesions', testName: "T1 Hypo Intense Lesions"},
            {scopeVariable: 'T2Lesions', testName: "T2 Hypo Intense Lesions"},
            {scopeVariable: 'GDSpineLesions', testName: "Gd Enhancing Lesions"},
            {scopeVariable: 'T2SpineLesions', testName: "T2 Hypo Intense Lesions"}];

        for (var t = 0; t < moNames.length; t++)
        {
            if (MOTEST == moNames[t].testName){
                return moNames[t];
            }
        }
        return null;
    }

    var getImagingLocalityScopeName = function(MOLOC) {
        var moNames = [{scopeVariable: 'lesionsInPeriventricular', locName: "Periventricular"},
            {scopeVariable: 'lesionsInJuxtacortical', locName: "Juxtacortical"},
            {scopeVariable: 'lesionsInInfratentorial', locName: "Infratentorial"},
            {scopeVariable: 'lesionsInOpticNerve', locName: "Optic Nerve"}];

        for (var t = 0; t < moNames.length; t++)
        {
            if (MOLOC == moNames[t].locName){
                return moNames[t];
            }
        }
        return null;
    }

    $scope.hideLocalityOfLesions = function() {
        if ($scope.MOLOC =='Brain')
            return ((($scope.T1Lesions=='Negative')||($scope.T1Lesions==null))
                &&(($scope.T2Lesions=='None')||($scope.T2Lesions==null))
                &&(($scope.GDLesions=='None')||($scope.GDLesions==null)));

        if ($scope.MOLOC =='Spine')
            return ((($scope.T2SpineLesions=='None')||($scope.T2SpineLesions==null))
                &&(($scope.GDSpineLesions=='None')||($scope.GDSpineLesions==null)));
    }

    var clearFields = function() {

        var loKeys = [{scopeVariable: 'lesionsInPeriventricular'},
            {scopeVariable: 'lesionsInJuxtacortical'},
            {scopeVariable: 'lesionsInInfratentorial'},
            {scopeVariable: 'lesionsInOpticalNerve'},
            {scopeVariable: 'Thoracic'},
            {scopeVariable: 'Cervical'}];

        for (var k = 0; k < loKeys.length; k++){
            // Get the model
            var modelValue = $parse(loKeys[k].scopeVariable);
            modelValue.assign($scope,false);
        }

        var gdKeys = [{scopeVariable: 'GDLesions'},
            {scopeVariable: 'GDSpineLesions'}];

        for (var k = 0; k < gdKeys.length; k++){
            // Get the model
            var modelValue = $parse(gdKeys[k].scopeVariable);
            modelValue.assign($scope,'');
        }

        var TKeys = [{scopeVariable: 'T1Lesions'},
            {scopeVariable: 'T2Lesions'},
            {scopeVariable: 'T2SpineLesions'}];

        for (var k = 0; k < TKeys.length; k++){
            // Get the model
            var modelValue = $parse(TKeys[k].scopeVariable);
            modelValue.assign($scope,'');
        }
    }

    $scope.setLBDTC = function () {
        $scope.LBDTC = new Date($scope.LBDTC_displayDate.substr(6), parseInt($scope.LBDTC_displayDate.substr(3,2))-1, $scope.LBDTC_displayDate.substr(0,2));
        console.log($scope.LBDTC);
    }

    $scope.editGdLesionsProperty = function() {
        addProcedure();
        var aFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "Gd Enhancing Lesions", $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            morphologyServices.deleteMorphologicalFinding(aFinding);
        } else {
            var newGdFinding = new Morphology($scope.USUBJID, "Gd Enhancing Lesions");
            newGdFinding.MOORRES = $scope.GDLesions;
            newGdFinding.MODTC = $scope.LBDTC;
            newGdFinding.MOLOC = $scope.MOLOC;
            newGdFinding.displayLabel = "Gd Enhancing Lesions";
            newGdFinding.displayDate = $scope.LBDTC.toDateString();
            morphologyServices.addMorphologicalFinding(newGdFinding);
        }
        console.log(morphologyServices.print());
    }

    $scope.editT1LesionsProperty = function() {
        addProcedure();
        var aFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T1 Hypo Intense Lesions", $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            morphologyServices.deleteMorphologicalFinding(aFinding);
        } else {
            var newGdFinding = new Morphology($scope.USUBJID, "T1 Hypo Intense Lesions");
            newGdFinding.MOORRES = $scope.T1Lesions;
            newGdFinding.MODTC = $scope.LBDTC;
            newGdFinding.MOLOC = $scope.MOLOC;
            newGdFinding.displayLabel = "Gd Enhancing Lesions";
            newGdFinding.displayDate = $scope.LBDTC.toDateString();
            morphologyServices.addMorphologicalFinding(newGdFinding);
        }
        console.log(morphologyServices.print());
    }

    $scope.editT2LesionsProperty = function() {
        addProcedure();
        var aFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T2 Hypo Intense Lesions", $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            morphologyServices.deleteMorphologicalFinding(aFinding);
        } else {
            var newGdFinding = new Morphology($scope.USUBJID, "T2 Hypo Intense Lesions");
            newGdFinding.MOORRES = $scope.T2Lesions;
            newGdFinding.MODTC = $scope.LBDTC;
            newGdFinding.MOLOC = $scope.MOLOC;
            newGdFinding.displayLabel = "T2 Hypo Intense Lesions";
            newGdFinding.displayDate = $scope.LBDTC.toDateString();
            morphologyServices.addMorphologicalFinding(newGdFinding);
        }
        console.log(morphologyServices.print());
    }

    $scope.editGdSpineLesionsProperty = function() {
        addProcedure();
        var aFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "Gd Enhancing Lesions", $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            morphologyServices.deleteMorphologicalFinding(aFinding);
        } else {
            var newGdFinding = new Morphology($scope.USUBJID, "Gd Enhancing Lesions");
            newGdFinding.MOORRES = $scope.GD.SpineLesions;
            newGdFinding.MODTC = $scope.LBDTC;
            newGdFinding.MOLOC = $scope.MOLOC;
            newGdFinding.displayLabel = "Gd Enhancing Lesions";
            newGdFinding.displayDate = $scope.LBDTC.toDateString();
            morphologyServices.addMorphologicalFinding(newGdFinding);
        }
    }

    $scope.editT2SpineLesionsProperty = function() {
        addProcedure();
        var aFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T2 Hypo Intense Lesions", $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            morphologyServices.deleteMorphologicalFinding(aFinding);
        } else {
            var newGdFinding = new Morphology($scope.USUBJID, "T2 Hypo Intense Lesions");
            newGdFinding.MOORRES = $scope.T2SpineLesions;
            newGdFinding.MODTC = $scope.LBDTC;
            newGdFinding.MOLOC = $scope.MOLOC;
            newGdFinding.displayLabel = "T2 Hypo Intense Lesions";
            newGdFinding.displayDate = $scope.LBDTC.toDateString();
            morphologyServices.addMorphologicalFinding(newGdFinding);
        }
    }

    var addProcedure = function() {
        if (procedures.getProcedureByTRTAndDate('MRI',  $scope.LBDTC).length == 0){
            var aProcedure = new procedure($scope.USUBJID, 'MRI');
            aProcedure.PRLOC = 'Head';
            aProcedure.PRSTDTC = $scope.LBDTC;
            aProcedure.displayLabel = 'MRI';
            aProcedure.displayDate = $scope.LBDTC.toDateString();
            //aProcedure.XNATExperimentID = experiments[e].id;
            //aProcedure.XNATExperimentURI = experiments[e].uri;

            //procedures.push(aProcedure);
            procedures.addProcedure(aProcedure);
        }
    }

    $scope.addLesionSecondaryLocation = function(MOSLOC) {
        if ($scope.MOLOC == 'Brain'){
            if (($scope.GDLesions!=null) &&($scope.GDLesions !='')) {
                var GdFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "Gd Enhancing Lesions", 'Brain');
                //console.log(GdFinding);
                if (GdFinding!=null) {
                    GdFinding.MOSLOC = MOSLOC;
                    morphologyServices.editMorphologicalLocation(GdFinding);
                }
            }

            if (($scope.T1Lesions!=null) &&($scope.T1Lesions !='')) {
                var T1Finding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T1 Hypo Intense Lesions", 'Brain');
                //console.log(aFinding);
                if (T1Finding!=null) {
                    T1Finding.MOSLOC = MOSLOC;
                    morphologyServices.editMorphologicalLocation(T1Finding);
                }
            }

            if (($scope.T2Lesions!=null) &&($scope.T2Lesions !='')) {
                var T2Finding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T2 Hypo Intense Lesions", 'Brain');
                //console.log(aFinding);
                if (T2Finding!=null) {
                    T2Finding.MOLOC = MOSLOC;
                    morphologyServices.editMorphologicalLocation(T2Finding);
                }
            }
        }

        if ($scope.MOLOC == 'Spine'){
            if (($scope.GD.SpineLesions!=null) &&($scope.GD.SpineLesions !='')) {
                var GdFinding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "Gd Enhancing Lesions", 'Spine');
                //console.log(GdFinding);
                if (GdFinding!=null) {
                    GdFinding.MOSLOC = MOSLOC;
                    morphologyServices.editMorphologicalLocation(GdFinding);
                }
            }

            if (($scope.T2SpineLesions!=null) &&($scope.T2SpineLesions !='')) {
                var T2Finding = morphologyServices.getFindingByTestAndLocation($scope.LBDTC.toDateString(), "T2 Hypo Intense Lesions", 'Spine');
                //console.log(aFinding);
                if (T2Finding!=null) {
                    T2Finding.MOSLOC = MOSLOC;
                    morphologyServices.editMorphologicalLocation(T2Finding);
                }
            }
        }
        morphologyServices.print();
    }



    $scope.zoomImage = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'zoomImage.html',
            controller: 'zoomImageCtrl',
            windowClass: 'image-modal-window',
            resolve: {
                imageURL: function () {
                    //console.log($scope.imageURL);
                    return $scope.imageURL;
                },
                imageDesc: function () {
                    //console.log($scope.selectedScan.type);
                    return $scope.selectedScan.type;
                },
                rawImageURIs: function() {
                    return $scope.selectedScan.raw;
                }
            }
        });

        modalInstance.result.then(function () {
            console.log('closed');
        }, function () {
            console.log("New Patient Entry Cancelled");
        });
    };

});

mriModule.service('mriServices', function($q) {

    var currentImage = '';
    var currentImageOrientation = '';
    var imageOrientations = [];

    var getImageOrientationPatient = function (imageOrientation)
    {
        //rowX, rowY, rowZ, colX, colY, colZ
        //var imageOrientation = currentImage.string('x00200037');
        //console.log(imageOrientation);
        var startIndex = 0;
        var values = [];
        var indexOfSlash = imageOrientation.indexOf('\\', startIndex);
        while (indexOfSlash != -1) {
            values.push(imageOrientation.substring(startIndex, indexOfSlash));
            startIndex = indexOfSlash+1;
            //imageOrientation = imageOrientation.substr(startIndex);
            indexOfSlash = imageOrientation.indexOf('\\', startIndex);
            if (indexOfSlash == -1) {
                values.push(imageOrientation.substr(startIndex));
            }
        }

        var rowX = values[0];
        var rowY = values[1];
        var rowZ = values[2];
        var colX = values[3];
        var colY = values[4];
        var colZ = values[5];

        var obliquityThresholdCosineValue = 0.8;

        var getMajorAxisFromPatientRelativeDirectionCosine = function( x,y,z) {
            var axis = null;

            var orientationX = x < 0 ? "R" : "L";
            var orientationY = y < 0 ? "A" : "P";
            var orientationZ = z < 0 ? "F" : "H";

            var absX = Math.abs(x);
            var absY = Math.abs(y);
            var absZ = Math.abs(z);

            // The tests here really don't need to check the other dimensions,
            // just the threshold, since the sum of the squares should be == 1.0
            // but just in case ...

            if (absX>obliquityThresholdCosineValue && absX>absY && absX>absZ) {
                axis=orientationX;
            }
            else if (absY>obliquityThresholdCosineValue && absY>absX && absY>absZ) {
                axis=orientationY;
            }
            else if (absZ>obliquityThresholdCosineValue && absZ>absX && absZ>absY) {
                axis=orientationZ;
            }
            return axis;
        }

        var label = null;
        var rowAxis = getMajorAxisFromPatientRelativeDirectionCosine(rowX,rowY,rowZ);
        var colAxis = getMajorAxisFromPatientRelativeDirectionCosine(colX,colY,colZ);
        //console.log(rowAxis);
        //console.log(colAxis);
        if (rowAxis != null && colAxis != null) {
            if ((rowAxis.indexOf("R") > -1 || rowAxis.indexOf("L") > -1)
                && (colAxis.indexOf("A") > -1 || colAxis.indexOf("P") > -1))
                    label="AXIAL";
            else if ((colAxis.indexOf("R") > -1 || colAxis.indexOf("L") > -1)
                && (rowAxis.indexOf("A") > -1 || rowAxis.indexOf("P") > -1))
                    label="AXIAL";

            else if ((rowAxis.indexOf("R") > -1 || rowAxis.indexOf("L")> -1)
                && (colAxis.indexOf("H") > -1 || colAxis.indexOf("F") > -1))
                    label="CORONAL";
            else if ((colAxis.indexOf("R") > -1 || colAxis.indexOf("L") > -1)
                && (rowAxis.indexOf("H") > -1 || rowAxis.indexOf("F") > -1))
                    label="CORONAL";

            else if ((rowAxis.indexOf("A") > -1 || rowAxis.indexOf("P") > -1)
                && (colAxis.indexOf("H") > -1 || colAxis.indexOf("F") > -1))
                    label="SAGITTAL";
            else if ((colAxis.indexOf("A") > -1 || colAxis.indexOf("P") > -1)
                && (rowAxis.equals("H")  > -1 || rowAxis.equals("F") > -1 ))
                    label="SAGITTAL";
        }
        else {
            label="OBLIQUE";
        }
        //console.log(label);
        return label;
    }

    var getImageProperties = function (url) {
        var deferred = $q.defer();
        try {

            var currentImageLoaded = getDICOM(url);
            currentImageLoaded.then(function(data) {
                //console.log(currentImage);
                var imageOrientation = data.string('x00200037');
                currentImageOrientation = getImageOrientationPatient(imageOrientation);
                var imageAndOrientation = {uri: url, orientation:currentImageOrientation};
                //console.log(imageAndOrientation);

                deferred.resolve(imageAndOrientation);
            })
            //var imageOrientation = currentImage.string('x00200037');
            //currentImageOrientation = getImageOrientationPatient(imageOrientation);

            //imageOrientations.push(currentImageOrientation);
            //console.log(currentImageOrientation);  */

        }catch (e) {
            deferred.reject(e);
        }
        return deferred.promise;
    }

    var getDICOM = function (url) {

        var deferred = $q.defer();
        try {
            var oReq = new XMLHttpRequest();
            try {
                oReq.open("get", url, true);
            }
            catch(err)
            {
                alert ("can't open file");
                return false;
            }

            oReq.responseType = "arraybuffer";
            oReq.onreadystatechange = function(oEvent)
            {
                if(oReq.readyState == 4)
                {
                    if(oReq.status == 200)
                    {
                        var byteArray = new Uint8Array(oReq.response);
                        var parsedDicom = dumpByteArray(byteArray);
                        deferred.resolve(parsedDicom);
                    }
                    else
                    {
                        alert('Status: HTTP Error - status code ' + oReq.status + '; error text = ' + oReq.statusText);
                    }
                }
            };
            oReq.send();
        }catch (e) {
            deferred.reject(e);
        }
        return deferred.promise;

    }

    var setCurrentImageDicom2 = function (url) {

        var oReq = new XMLHttpRequest();
        try {
            oReq.open("get", url, true);
        }
        catch(err)
        {
            alert ("can't open file");
            return false;
        }

        oReq.responseType = "arraybuffer";
        oReq.onreadystatechange = function(oEvent)
        {
            if(oReq.readyState == 4)
            {
                if(oReq.status == 200)
                {
                    var byteArray = new Uint8Array(oReq.response);
                    dumpByteArray(byteArray);
                    /*
                    var imageOrientation = currentImage.string('x00200037');
                    currentImageOrientation = getImageOrientationPatient(imageOrientation);
                    imageOrientations.push(currentImageOrientation);
                    console.log(currentImageOrientation);*/
                }
                else
                {
                    alert('Status: HTTP Error - status code ' + oReq.status + '; error text = ' + oReq.statusText);
                }
            }
        };
        oReq.send();
    }

    var dumpByteArray = function(byteArray)
    {
        // Here we have the file data as an ArrayBuffer.  dicomParser requires as input a
        // Uint8Array so we create that here
        var kb = byteArray.length / 1024;
        var mb = kb / 1024;
        var byteStr = mb > 1 ? mb.toFixed(3) + " MB" : kb.toFixed(0) + " KB";
        //document.getElementById('statusText').innerHTML = 'Status: Parsing ' + byteStr + ' bytes, please wait..';
        // set a short timeout to do the parse so the DOM has time to update itself with the above message

        var currentImage = dicomParser.parseDicom(byteArray);
        return currentImage;
        // Here we call dumpDataSet to recursively iterate through the DataSet and create an array
        // of strings of the contents.


        /*
        setTimeout(function() {

            // Invoke the paresDicom function and get back a DataSet object with the contents
            var dataSet;
            try {
                var start = new Date().getTime();
                currentImage = dicomParser.parseDicom(byteArray);
                // Here we call dumpDataSet to recursively iterate through the DataSet and create an array
                // of strings of the contents.
                var imageOrientation = currentImage.string('x00200037');
                currentImageOrientation = getImageOrientationPatient(imageOrientation);
                console.log(currentImageOrientation);
            }
            catch(err)
            {
                alert('Status: Error - ' + err + ' (file of size ' + byteStr + ' )');
            }
        },1);*/
    }

    var getCurrentImageOrientation = function(index) {

        console.log(imageOrientations[index]);
        return imageOrientations[index];
    }


    return {
        getImageOrientationPatient:getImageOrientationPatient,
        //setCurrentImageDicom: setCurrentImageDicom,
        getCurrentImageOrientation: getCurrentImageOrientation,
        getImageProperties: getImageProperties
    }
})

mriModule.controller('zoomImageCtrl', function ($scope, $uibModalInstance, $timeout, imageURL, imageDesc, rawImageURIs, mriServices) {

    var loading = true;

    $scope.ok = function () {
        //console.log(imageURL);
        $uibModalInstance.close();
    };

    $scope.getImage = function() {
        //console.log(imageURL);
        return imageURL;
    }

    $scope.getDesc = function() {
        //console.log(imageDesc);
        return imageDesc;
    }

    var imageIds = [];

    var setImageIDs = function () {

        var step = 1;

        for (var i=0; i<rawImageURIs.length; i=i+step) {
        //for (var i=0; i<10; i=i+step) {
            //var uri = "https://central.xnat.org"+rawImageURIs[i];
            var uri = "http://www.optimise-ms.org/api-optimise/xnat/proxy.php/"+rawImageURIs[i];


            imageIds.push("dicomweb:"+uri);

            /*
            var imageParsed = mriServices.getImageProperties(uri);
            imageParsed.then(function(data) {
                imageIds.push("dicomweb:"+data.uri);
                console.log(imageIds.length);
            });
            */
        }

        function compareNumbers(a, b) {
            //1.3.12.2.1107.5.2.36.40436.30000014081908371717200000064-8-41-skte63.dcm
            //index
            var strippedA = a.substr(a.lastIndexOf("/")+1);
            var strippedB = b.substr(b.lastIndexOf("/")+1);
            //console.log(strippedA);

            //8-41-skte63.dcm
            strippedA = strippedA.substring(strippedA.indexOf("-"));
            strippedB = strippedB.substring(strippedB.indexOf("-"));
            //console.log(strippedA);

            //8-41
            strippedA = strippedA.substring(0,strippedA.lastIndexOf("-"));
            strippedB = strippedB.substring(0,strippedB.lastIndexOf("-"));
            //console.log(strippedA);

            //41
            strippedA = strippedA.substring(strippedA.lastIndexOf("-")+1);
            strippedB = strippedB.substring(strippedB.lastIndexOf("-")+1);
            //console.log(strippedA);

            return parseInt(strippedA) - parseInt(strippedB);
        }

        imageIds = imageIds.sort(compareNumbers);

        $timeout(function(){
            getImageStack();
            console.log("got");
        });
    }

    var getImageStack = function() {
        var element = $('#imageDOM').get(0);
        //console.log(element);
        var onViewportUpdated = function(e, data) {
            var viewport = data.viewport;
            data.viewport.scale = 2.5;
            $('#mrbottomleft').text("WW/WC: " + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
            $('#zoomText').text("Zoom: " + viewport.scale.toFixed(2.5));
        };

        $(element).on("CornerstoneImageRendered", onViewportUpdated);

        var onNewImage = function(e, data) {
            var newImageIdIndex = stack.currentImageIdIndex;

            // Update the slider value
            var slider = document.getElementById('slice-range');
            slider.value = newImageIdIndex;

            // Populate the current slice span
            var currentValueSpan = document.getElementById("sliceText");
            currentValueSpan.textContent = "Image " + (newImageIdIndex + 1) + "/" + imageIds.length;
        }

        $(element).on("CornerstoneNewImage", onNewImage);

        var updateStack = function () {
            var targetElement = document.getElementById("imageDOM");

            var range = document.getElementById('slice-range');

            // Get the range input value
             var newImageIdIndex = parseInt(range.value, 10);

            // Get the stack data
             var stackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack');
             if (stackToolDataSource === undefined) {
                return;
             }
             var stackData = stackToolDataSource.data[0];

             // Switch images, if necessary
             if(newImageIdIndex !== stackData.currentImageIdIndex && stackData.imageIds[newImageIdIndex] !== undefined) {

                cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image) {
                    var viewport = cornerstone.getViewport(targetElement);
                    stackData.currentImageIdIndex = newImageIdIndex;
                    cornerstone.displayImage(targetElement, image, viewport);
                });
             }
        }

        var stack = {
            currentImageIdIndex : 0,
            imageIds: imageIds
        };

        // Initialize range input
        //var range, max, slice, currentValueSpan;
        var range = document.getElementById('slice-range');

        // Set minimum and maximum value
        range.min = 0;
        range.step = 1;
        range.max = imageIds.length - 1;

        // Set current value
        range.value = stack.currentImageIdIndex;

        $("#slice-range").on("input", updateStack);

        cornerstone.enable(element);
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);

        var numLoadedImages = 0;
        for (var i = 0; i < imageIds.length; i++) {
            cornerstone.loadAndCacheImage(imageIds[i]).then(function(image) {
                cornerstone.displayImage(element, image);
                numLoadedImages++;
                if (numLoadedImages == 1) {
                    loading = true;
                    console.log($scope.getLoadingStatus());
                }
                if (numLoadedImages == (imageIds.length-1)){
                    loading = false;
                    console.log("Loading false");
                    console.log($scope.getLoadingStatus());
                }
            });
        }

        // Set the stack as tool state
        cornerstoneTools.addStackStateManager(element, ['stack']);
        cornerstoneTools.addToolState(element, 'stack', stack);

        cornerstoneTools.stackScroll.activate(element, 1);
        cornerstoneTools.stackScrollWheel.activate(element);
    }

    //loading = false;
    setImageIDs();

    $scope.getLoadingStatus = function() {
        return loading;
    }

});

    /*

     $rootScope.displayMRI = function() {
        clearFields();
        var LBDTC = procedures.getCurrentProcedure().PRSTDTC;
        setScansTakenDuringExperiment(procedures.getCurrentProcedure().XNATExperimentID);
        var morphologicalFindings = morphologyServices.getFindingsByDate(LBDTC.toDateString());
        for (var f = 0; f < morphologicalFindings.length; f++) {
            var scopeVariables = getImagingMorphologyScopeName(morphologicalFindings[f].MOTEST);
            if (scopeVariables != null){
                if (morphologicalFindings[f].MOLOC == $scope.MOLOC){
                    if ((scopeVariables.scopeVariable == 'GdEnhancingLesions')||
                        (scopeVariables.scopeVariable == 'T1HypointenseLesions')||
                        (scopeVariables.scopeVariable == 'T2HypointenseLesions')) {
                        var modelTestValue = $parse(scopeVariables.scopeVariable);
                        modelTestValue.assign($scope, morphologicalFindings[f].MOORRES);
                    }
                }
                if (scopeVariables.scopeVariable == 'normalisedBrainVolume') {
                    var modelTestValue = $parse(scopeVariables.scopeVariable);
                    modelTestValue.assign($scope, morphologicalFindings[f].MOORRES);
                }
            } else {
                if (morphologicalFindings[f].MOTEST == 'Lesions') {
                    switch (morphologicalFindings[f].MOLOC) {
                        case 'Periventricular': {
                            $scope.lesionsPeriventricular = morphologicalFindings[f].MOORRES;
                        }
                        case 'Juxtacortical': {
                            $scope.lesionsJuxtacortical = morphologicalFindings[f].MOORRES;
                        }
                        case 'Infracortical': {
                            $scope.lesionsInfracortical = morphologicalFindings[f].MOORRES;
                        }
                        case 'Spinal Cord': {
                            $scope.lesionsSpinalCord = morphologicalFindings[f].MOORRES;
                        };
                    }
                }
            }
        }
    }
    var getImagingMorphologyScopeName = function(MOTEST) {
        var moNames = [{scopeVariable: 'GdEnhancingLesions', testName: "Gd Enhancing Lesions"},
            {scopeVariable: 'T1HypointenseLesions', testName: "T1 Hypo Intense Lesions"},
            {scopeVariable: 'T2HypointenseLesions', testName: "T2 Hypo Intense Lesions"},
            //{scopeVariable: 'normalisedBrainVolume', testName: "Volume"},
            {scopeVariable: 'lesionsPeriventricular', testName: "Lesions"},
            {scopeVariable: 'lesionsJuxtacortical', testName: "Lesions"},
            {scopeVariable: 'lesionsInfracortical', testName: "Lesions"},
            {scopeVariable: 'lesionsOpticNerve', testName: "Lesions"},
            {scopeVariable: 'lesionsSpinalCord', testName: "Lesions"}];

        for (var t = 0; t < moNames.length; t++)
        {
            if (MOTEST == moNames[t].testName){
                return moNames[t];
            }
        }
        return null;
    }

    $scope.editNumLesions = function(MOTEST) {
        var collectionDate = new Date($scope.LBDTC);
        var scopeVariable = getImagingMorphologyScopeVariable(MOTEST).scopeVariable;
        var aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), MOTEST, $scope.MOLOC);
        //console.log(aFinding);
        if (aFinding!=null) {
            if (scopeVariable=="") {
                morphologyServices.deleteMorphologicalFinding(aFinding);
            }
            else {
                aFinding.MOORRES = scopeVariable;
                //console.log(aFinding);
                morphologyServices.editMorphologicalFinding(aFinding);
            }
        }
        else {
            if (scopeVariable!=""){
                var newFinding = new Morphology($scope.USUBJID, MOTEST);
                newFinding.MOORRES = scopeVariable;
                newFinding.MODTC = collectionDate;
                newFinding.MOLOC = $scope.MOLOC;
                newFinding.displayLabel = MOTEST;
                newFinding.displayDate = collectionDate.toDateString();
                morphologyServices.addMorphologicalFinding(newFinding);
            }
        }
    }

    $scope.editLesionLocality = function(MOLOC) {
        var collectionDate = new Date($scope.LBDTC);
        var aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), 'Lesions', MOLOC);
        if (aFinding!=null) {
            var newMOORRES = '';
            switch (MOLOC) {
                case 'Periventricular': {
                    newMOORRES = $scope.lesionsPeriventricular;
                }
                case 'Juxtacortical': {
                    newMOORRES = $scope.lesionsJuxtacortical;

                }
                case 'Infracortical': {
                    newMOORRES = $scope.lesionsInfracortical;
                }
                case 'Spinal Cord': {
                    newMOORRES = $scope.lesionsSpinalCord;
                }
            };
            aFinding.MOORRES = newMOORRES;
            morphologyServices.editMorphologicalFinding(aFinding);
        }
        else {
            var newFinding = new Morphology($scope.USUBJID, 'Lesions');
            newFinding.MOORRES = true;
            newFinding.MODTC = collectionDate;
            newFinding.MOLOC = MOLOC;
            newFinding.displayLabel = 'Lesions';
            newFinding.displayDate = collectionDate.toDateString();
            morphologyServices.addMorphologicalFinding(newFinding);
        }
    }


    $scope.displayNumLesionBasedOnLocation = function() {
        var collectionDate = new Date($scope.LBDTC);
        //console.log($scope.MOLOC);
        var aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), 'Gd Enhancing Lesions', $scope.MOLOC);
        if (aFinding == null)
            $scope.GdEnhancingLesions = '';
        else
            $scope.GdEnhancingLesions = aFinding.MOORRES;

        //console.log($scope.GdEnhancingLesions);

        aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), 'T1 Hypo Intense Lesions', $scope.MOLOC);
        if (aFinding == null)
            $scope.T1HypointenseLesions = '';
        else
            $scope.T1HypointenseLesions = aFinding.MOORRES;

        aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), 'T2 Hypo Intense Lesions', $scope.MOLOC);
        if (aFinding == null)
            $scope.T1HypointenseLesions = '';
        else
            $scope.T2HypointenseLesions = aFinding.MOORRES;
    }


    $scope.editBrainVolume = function() {
        var collectionDate = new Date($scope.LBDTC);
        var aFinding = morphologyServices.getFindingByTestAndLocation(collectionDate.toDateString(), 'Volume', 'Brain');
        if (aFinding!=null) {
            aFinding.MOORRES = $scope.normalisedBrainVolume;
            morphologyServices.editMorphologicalFinding(aFinding);
        }
        else {
            var newFinding = new Morphology($scope.USUBJID, 'Volume');
            newFinding.MOORRES = $scope.normalisedBrainVolume;;
            newFinding.MOORRESU = 'mL';
            newFinding.MODTC = collectionDate;
            newFinding.MOLOC = 'Brain';
            newFinding.displayLabel = 'Normalised Brain Volume';
            newFinding.displayDate = collectionDate.toDateString();
            morphologyServices.addMorphologicalFinding(newFinding);
        }
    }*/

/*
 $scope.setScansTakenDuringExperiment = function () {
 var LBDTC = procedures.getCurrentProcedure().PRSTDTC;
 var XNATExperimentID = procedures.getCurrentProcedure().XNATExperimentID;
 $scope.scansTakenDuringExperiment = [];
 for (var s = 0; s < $scope.scans.length; s++) {
 if ($scope.scans[s].experimentID == XNATExperimentID) {
 $scope.scansTakenDuringExperiment.push($scope.scans[s]);
 }
 }
 };
 */