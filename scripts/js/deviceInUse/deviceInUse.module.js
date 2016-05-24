/**
 * Created with IntelliJ IDEA.
 * User: myyong
 * Date: 06/05/2015
 * Time: 16:16
 * To change this template use File | Settings | File Templates.
 */

var deviceInUseModule = angular.module('Optimise.deviceInUse',['Optimise.view', 'Optimise.record']);

deviceInUseModule.factory('DeviceInUse', function() {
    return function(USUBJID, DUTEST) {
        var device = {
            STUDYID:'OPTIMISE',
            DOMAIN:'MO',
            USUBJID:USUBJID,
            SPDEVID:'',
            DUSEQ:'',
            DUREFID:'',
            DUTESTCD:'',
            DUTEST:DUTEST,
            DUORRES:'',
            DUORRESU:'',
            DUDTC:'',
            SCANREF:''
        }
        return device;
    };
});

deviceInUseModule.service('deviceInUseServices', function(DeviceInUse, records, viewService) {

    var scansFromDevice = [];

    var populateDeviceInUse = function (RecordItems) {
        var aFinding = new Morphology();
        //console.log(RecordItems);
        for (var i = 0; i < RecordItems.length; i++){
            switch (RecordItems[i].fieldName) {
                case 'STUDYID':{
                    aFinding.STUDYID = RecordItems[i].value;
                    break;
                }
                case 'DOMAIN':{
                    aFinding.DOMAIN = RecordItems[i].value;
                    break;
                }
                case 'USUBJID':{
                    aFinding.USUBJID = RecordItems[i].value;
                    break;
                }
                case 'SPDEVID':{
                    aFinding.SPDEVID = RecordItems[i].value;
                    break;
                }
                case 'MOSEQ':{
                    aFinding.MOSEQ = parseInt(RecordItems[i].value);
                    break;
                }
                case 'MOLNKID':{
                    aFinding.MOLNKID = RecordItems[i].value;
                    break;
                }
                case 'MOREFID':{
                    aFinding.MOREFID = RecordItems[i].value;
                    break;
                }
                case 'MOTESTCD':{
                    aFinding.MOTESTCD = RecordItems[i].value;
                    break;
                }
                case 'MOTEST':{
                    aFinding.MOTEST = RecordItems[i].value;
                    break;
                }
                case 'MOORRES':{
                    aFinding.MOORRES = RecordItems[i].value;
                    break;
                }
                case 'MOORRESU':{
                    aFinding.MOORRESU = RecordItems[i].value;
                    break;
                }
                case 'MOSTRESC':{
                    aFinding.MOSTRESC = RecordItems[i].value;
                    break;
                }
                case 'MOSTRESN':{
                    aFinding.MOSTRESN = RecordItems[i].value;
                    break;
                }
                case 'MOSTRESU':{
                    aFinding.MOSTRESU = RecordItems[i].value;
                    break;
                }
                case 'MOLOC':{
                    aFinding.MOLOC = RecordItems[i].value;
                    break;
                }
                case 'MOLAT':{
                    aFinding.MOLAT = RecordItems[i].value;
                    break;
                }
                case 'MOMETHOD':{
                    aFinding.MOMETHOD = RecordItems[i].value;
                    break;
                }
                case 'MOANMETH':{
                    aFinding.MOANMETH = RecordItems[i].value;
                    break;
                }
                case 'MODTC':{
                    aFinding.MODTC = records.formatStringToDate(RecordItems[i].value);
                    break;
                }
            }
        }
        scansFromDevice.push(aFinding);
    }

    var generateSEQ = function () {
        var SEQs = compileScans();
        if (SEQs.length > 0) {
            SEQs.sort(sortNumber);
            return (SEQs[SEQs.length-1]+1);
        }
        else {
            return 0;
        }
    }

    function sortNumber(a,b) {
        return a - b;
    }


    var compileScans = function () {
        var seq = [];
        for (var e = 0; e < scansFromDevice.length; e++) {
            seq.push(scansFromDevice[e].DUSEQ);
        }
        return seq;
    }

    var addDeviceInUse = function(du) {
        du.DUSEQ = generateSEQ();
        scansFromDevice.push(du);
        if (!viewService.workOffline())
            records.saveRecord(du);
    }

    var editDeviceInUse = function(du) {
        var USUBJID = {fieldName: "USUBJID", value: du.USUBJID};
        var DUTEST = {fieldName:"DUTEST", value: du.DUTEST};
        var DUORRES = {fieldName:"DUORRES", value: du.VSORRES};
        var DUSEQ = {fieldName:"DUSEQ", value: du.MOSEQ};

        var idRecord = [USUBJID, DUTEST, DUSEQ];
        var valueRecord = [DUORRES];
        if (!viewService.workOffline())
            records.editRecord(idRecord, valueRecord);
    }

    var deleteDeviceInUse = function(du) {
        var index = scansFromDevice.indexOf(du);
        if (index > -1) {
            scansFromDevice.splice(index, 1);
            if (!viewService.workOffline())
                records.deleteRecord(du);
        }
    }

    var getDeviceInUseByDate = function(DUDTC) {
        var properties = [];
        for (var e = 0; e < scansFromDevice.length; e++) {
            if (scansFromDevice[e].DUDTC.toDateString() == DUDTC)
            {
                properties.push(scansFromDevice[e]);
            }
        }
        return properties;
    }

    var getDeviceInUseByTest = function(DUDTC, DUTEST) {
        for (var e = 0; e < scansFromDevice.length; e++) {
            if ((scansFromDevice[e].DUDTC.toDateString() == DUDTC)&&
                (scansFromDevice[e].DUTEST == DUTEST)) {
                return scansFromDevice[e];
            }
        }
        return null;
    };

    var getScansByDate = function(DUDTC) {
        var scans = [];
        for (var e = 0; e < scansFromDevice.length; e++) {
            if ((scansFromDevice[e].DUDTC.toDateString() == DUDTC)&&
                (scansFromDevice[e].DUTEST == 'Anatomical Plane')) {
                scans.push(scansFromDevice[e]);
            }
        }
        return null;
    };

    var print = function() {
        console.log(scansFromDevice);
    }

    return {
        addDeviceInUse: addDeviceInUse,
        editDeviceInUse: editDeviceInUse,
        editDeviceInUse: editDeviceInUse,
        deleteDeviceInUse:deleteDeviceInUse,
        getDeviceInUseByDate:getDeviceInUseByDate,
        getDeviceInUseByTest:getDeviceInUseByTest,
        populateDeviceInUse: populateDeviceInUse,
        getScansByDate:getScansByDate,
        print:print
    }
});
