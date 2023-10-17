// Navigation

var startTimeStamp = null;
var processedUnload = false;
var reachedEnd = false;
var currentPage;

// Scorm

var completionStatus;

// App State

var appState;
var progress = [];
var resultFinalTest = 0;
var learner_name = '';

// Inicialización

function startScorm() {

    startTimeStamp = new Date();
    ScormProcessInitialize();
    
    completionStatus = ScormProcessGetValue("cmi.core.lesson_status");
    if (completionStatus == "not attempted"){
        ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
    }

    if (ScormProcessGetValue("cmi.core.student_name")) {
        learner_name = ScormProcessGetValue("cmi.core.student_name");
    } 

    if (ScormProcessGetValue("cmi.suspend_data")) {
        appState = JSON.parse(ScormProcessGetValue("cmi.suspend_data"));
        progress = appState.progress;
        resultFinalTest = appState.resultFinalTest;
    } else {
        progress.push({pass: true});
        for (i=1; i < pages.length; i++) {
            progress.push({pass: false})
        }
        resultFinalTest = 0;
    }

    if (ScormProcessGetValue("cmi.core.lesson_location", false)) {
        currentPage = Number(ScormProcessGetValue("cmi.core.lesson_location", false));
        navTo();
    } else {
        currentPage = 0;
        navTo();
    }

}

// Set State

function setState() {
    appState = {
        progress: progress,
        resultFinalTest: resultFinalTest
    };
    appStateStr = JSON.stringify(appState);
    ScormProcessSetValue("cmi.suspend_data", appStateStr);
    var score = resultFinalTest * 10;
    ScormProcessSetValue("cmi.core.score.raw", score);
    ScormProcessSetValue("cmi.core.score.min", "0");
    ScormProcessSetValue("cmi.core.score.max", "100");
    // if (score >= 70){
    //     ScormProcessSetValue("cmi.core.lesson_status", "completed");
    // } else{
    //     ScormProcessSetValue("cmi.core.lesson_status", "incomplete");
    // }
}

function doUnload(pressedExit){
        
    if (processedUnload == true){return;}
    
    processedUnload = true;
    
    var endTimeStamp = new Date();
    var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
    var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
    
    ScormProcessSetValue("cmi.core.session_time", scormTime);
    
    if (pressedExit == false && reachedEnd == false){
        ScormProcessSetValue("cmi.core.exit", "suspend");
    }
    
    ScormProcessFinish();
}

function doExit(){

    doUnload(true);
    
}

function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds, blnIncludeFraction){

    var intHours;
    var intintMinutes;
    var intSeconds;
    var intMilliseconds;
    var intHundredths;
    var strCMITimeSpan;
    
    if (blnIncludeFraction == null || blnIncludeFraction == undefined){
        blnIncludeFraction = true;
    }
    
    intMilliseconds = intTotalMilliseconds % 1000;

    intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;

    intMinutes = ((intTotalMilliseconds - intMilliseconds - (intSeconds * 1000)) / 60000) % 60;

    intHours = (intTotalMilliseconds - intMilliseconds - (intSeconds * 1000) - (intMinutes * 60000)) / 3600000;



    if (intHours == 10000) 
    {	
        intHours = 9999;

        intMinutes = (intTotalMilliseconds - (intHours * 3600000)) / 60000;
        if (intMinutes == 100) 
        {
            intMinutes = 99;
        }
        intMinutes = Math.floor(intMinutes);
        
        intSeconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000)) / 1000;
        if (intSeconds == 100) 
        {
            intSeconds = 99;
        }
        intSeconds = Math.floor(intSeconds);
        
        intMilliseconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000) - (intSeconds * 1000));
    }

    intHundredths = Math.floor(intMilliseconds / 10);

    strCMITimeSpan = ZeroPad(intHours, 4) + ":" + ZeroPad(intMinutes, 2) + ":" + ZeroPad(intSeconds, 2);
    
    if (blnIncludeFraction){
        strCMITimeSpan += "." + intHundredths;
    }

    if (intHours > 9999) 
    {
        strCMITimeSpan = "9999:99:99";
        
        if (blnIncludeFraction){
            strCMITimeSpan += ".99";
        }
    }

    return strCMITimeSpan;
    
}

function ZeroPad(intNum, intNumDigits){

    var strTemp;
    var intLen;
    var i;
    
    strTemp = new String(intNum);
    intLen = strTemp.length;
    
    if (intLen > intNumDigits){
        strTemp = strTemp.substr(0,intNumDigits);
    }
    else{
        for (i=intLen; i<intNumDigits; i++){
            strTemp = "0" + strTemp;
        }
    }
    
    return strTemp;
}