var pages = [
    {title: '', path: 'frontpage'},
    {title: '1.1. Datos personales', path: '01'},
    {title: '1.2. Contexto del tratamiento de los datos', path: '02'},
    {title: '1.2. Contexto del tratamiento de los datos', path: '02bis'},
    {title: '1.2. Contexto del tratamiento de los datos', path: '03'},
    {title: '2.1. ¿Qué es el RGPD?', path: '04'},
    {title: '2.2. Paradigma existente en el tratamiento de datos personales', path: '05'},
    // {title: '2.2. Principios del RGPD', path: '05bis'},
    {title: '2.3. Principios del RGPD', path: '06'},
    {title: '2.4. Principios del tratamiento', path: '07'},
    {title: '2.5. ¿Sabrías responder correctamente?', path: '08'},
    {title: '3. Figuras en la privacidad', path: '09'},
    {title: '4.1. Bases Legitimadoras', path: '10'},
    {title: '4.2. Información y consentimiento', path: '11'},
    {title: '4.2. Información y consentimiento', path: '12'},
    {title: '4.3. ¿Sabrías responder correctamente?', path: '13'},
    {title: '4.4. Derechos de los interesados', path: '14'},
    {title: '4.4. Derechos de los interesados', path: '15'},
    {title: '5. LOPDGDD', path: '16'},
    {title: '6. Y tú como empleado... ¿Cómo puedes colaborar?', path: '17'},
    {title: 'Test Final de contenidos', path: '18'}, 
    {title: 'Test Final de contenidos', path: '19'},
];

// pages.forEach((el) => {
//     progress.push({pass: true});
// })

var nextBtn = document.getElementById('next-btn');
var prevBtn = document.getElementById('prev-btn');
var i1 = document.getElementById('i-1');
// var is1 = document.getElementById('i-s-1');
// var i11 = document.getElementById("i-1-1");
// var i12 = document.getElementById("i-1-2");
// var i13 = document.getElementById("i-1-3");
var i2 = document.getElementById('i-2');
// var is2 = document.getElementById('i-s-2');
// var i21 = document.getElementById('i-2-1');
// var i22 = document.getElementById('i-2-2');
// var i23 = document.getElementById('i-2-3');
// var i24 = document.getElementById('i-2-4');
var i3 = document.getElementById('i-3');
var i4 = document.getElementById('i-4');
// var is4 = document.getElementById('i-s-4');
// var i41 = document.getElementById('i-4-1');
// var i42 = document.getElementById('i-4-2');
var i5 = document.getElementById('i-5');
var i6 = document.getElementById('i-6');
var pieWrapper = document.getElementById('pie-wrapper');
var pieLabel = document.getElementById('pie-label');
prevBtn.style.display = 'none';
nextBtn.style.display = 'none';

var finalTestPassed = false;

function navTo() {
    $("#content").empty();
    $("#content").load("content/" + pages[currentPage].path + "/index.html", function()	{
        $("#slide").fadeIn('slow');												  
    });
    setTimeout(() => {
        ScormProcessSetValue("cmi.core.lesson_location", currentPage);
    }, 500);
    setNavState();
    setMenuState();
    setActiveMenuItem();
    $('html, body').animate({
        scrollTop: 0
    }, 400);
}

function prevPage() {
    currentPage--;
    navTo();
}

function nextPage() {
    currentPage++;
    navTo();
}

function navToPage(e) {
    if(progress[e - 1].pass) {
        currentPage = e;
        toggleNav();
        navTo();
    }
}

function setNavState() {
    document.getElementById('header-title').innerHTML = pages[currentPage].title;
    nextBtn = document.getElementById('next-btn');
    prevBtn = document.getElementById('prev-btn');
    if(currentPage === 0) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'inline';
    } else if (currentPage === pages.length - 1) {
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline';
        nextBtn.style.display = 'inline';
    }
    if(!progress[currentPage].pass) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function passPage() {
    progress[currentPage].pass = true;
    if(!progress[currentPage].pass) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    setState();
}

function setMenuState() {
    pieWrapper.removeAttribute("class")
    pieWrapper.classList.add('pie-wrapper');
    if (progress[0].pass) {
        i1.classList.add('in-progress');
        pieLabel.innerHTML = '0 <span class="smaller">%</span>';
    }
    if (progress[4].pass) {
        i1.classList.add('done');
        i2.classList.add('in-progress');
        pieWrapper.classList.add('progress-20');
        pieLabel.innerHTML = '20 <span class="smaller">%</span>';
    } 
    if (progress[9].pass) {
        i2.classList.add('done');
        i3.classList.add('in-progress');
        pieWrapper.classList.remove('progress-20');
        pieWrapper.classList.add('progress-40');
        pieLabel.innerHTML = '40 <span class="smaller">%</span>';
    } 
    if (progress[10].pass) {
        i3.classList.add('done');
        i4.classList.add('in-progress');
        pieWrapper.classList.remove('progress-40');
        pieWrapper.classList.add('progress-60');
        pieLabel.innerHTML = '60 <span class="smaller">%</span>';
    } 
    if (progress[16].pass) {
        i4.classList.add('done');
        i5.classList.add('in-progress');
        pieWrapper.classList.remove('progress-60');
        pieWrapper.classList.add('progress-80');
        pieLabel.innerHTML = '80 <span class="smaller">%</span>';
    } 
    if (progress[17].pass) {
        i5.classList.add('done');
        i6.classList.add('done');
        pieWrapper.classList.remove('progress-80');
        pieWrapper.classList.add('progress-100');
        pieLabel.innerHTML = '100 <span class="smaller">%</span>';
    } 
}

function setActiveMenuItem() {
    i1.classList.remove('active');
    // is1.classList.remove('in-progress');
    // i11.classList.remove('active');
    // i12.classList.remove('active');
    // i13.classList.remove('active');
    i2.classList.remove('active');
    // is2.classList.remove('in-progress');
    // i21.classList.remove('active');
    // i22.classList.remove('active');
    // i23.classList.remove('active');
    // i24.classList.remove('active');
    i3.classList.remove('active');
    i4.classList.remove('active');
    // is4.classList.remove('in-progress');
    // i41.classList.remove('active');
    // i42.classList.remove('active');
    i5.classList.remove('active');
    i6.classList.remove('active');
    if (currentPage === 1 || currentPage === 2) {
        i1.classList.add('active');
    } else if (currentPage >= 3 && currentPage < 8) {
        i2.classList.add('active');
    } else if (currentPage === 8) {
        i3.classList.add('active');
    } else if (currentPage >= 9 && currentPage < 16) {
        i4.classList.add('active');
    // } else if (currentPage === 5) {
    //     i4.classList.add('active');
        // is4.classList.add('in-progress');
        // i41.classList.add('active');
    } else if (currentPage === 16 || currentPage === 17) {
        i5.classList.add('active');
    } else if (currentPage === 18 || currentPage === 19) {
        i6.classList.add('active');
    } 
}

function exit() {
    ScormProcessSetValue("cmi.core.exit", "suspend");
    doUnload(true);
    setTimeout(() => {
        top.window.close()
    }, 500);
}

function returnPosition(value) {
    if (value === 'A') {
        return 0;
    } else if (value === 'B') {
        return 1;
    } else if (value === 'C') {
        return 2;
    } else if (value === 'D') {
        return 3;
    } else if (value === 'E') {
        return 4;
    } else if (value === 'F') {
        return 5;
    } else if (value === 'G') {
        return 6;
    } else if (value === 'H') {
        return 7;
    }
}

