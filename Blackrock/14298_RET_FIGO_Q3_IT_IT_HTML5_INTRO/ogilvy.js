var stage;

//images
var upImages = [];
var downImages = [];
var chevron0;
var chevron1;

var copy_up;
var copy_down;

var logo;

//vectors
var bg;
//switches
var started = false;

//state
var currentSection;
var upArrowCount = 9;
var downArrowCount = 7;


//DOM elements
var overlay;
var vidContainer;

//timings
var t_upBeginFrame = 00001;
var t_downBeginFrame = 03000;
var t_chevronBeginFrame = 06000;
var t_ctaBeginFrame = 09000;


up_sizes = [];
up_sizes[0] = 0.51;
up_sizes[1] = 0.91;
up_sizes[2] = 0.71;
up_sizes[3] = 0.41;
up_sizes[4] = 0.81;
up_sizes[5] = 0.81;
up_sizes[6] = 0.81;
up_sizes[7] = 0.81;
up_sizes[8] = 0.81;


down_sizes = [];
down_sizes[0] = 1.00;
down_sizes[1] = 0.849;
down_sizes[2] = 0.61;
down_sizes[3] = 0.798;
down_sizes[4] = 0.817;
down_sizes[5] = 0.695;
down_sizes[6] = 0.798;
down_sizes[7] = 0.798;
down_sizes[8] = 0.689;
down_sizes[9] = 0.81;


//up arrow start + end positions
positions = [];


positions["up_start"] = [];

positions["up_start"][0] = [-604, 504];
positions["up_start"][1] = [-702, 630];
positions["up_start"][2] = [-660, 880];
positions["up_start"][3] = [40, 842];
positions["up_start"][4] = [-111, 842];
positions["up_start"][5] = [-542, 818];
positions["up_start"][6] = [-430, 224];
positions["up_start"][7] = [-706, 311];
positions["up_start"][8] = [-581, 126];

positions["up_mid"] = [];

positions["up_mid"][0] = [170, 240];
positions["up_mid"][1] = [20, 256];
positions["up_mid"][2] = [-222, 636];
positions["up_mid"][3] = [540, 566];
positions["up_mid"][4] = [356, 588];
positions["up_mid"][5] = [356, 382];
positions["up_mid"][6] = [25, -8];
positions["up_mid"][7] = [244, -188];
positions["up_mid"][8] = [258, -52];


positions["up_end"] = [];

positions["up_end"][0] = [0, 0];
positions["up_end"][1] = [0, 0];
positions["up_end"][2] = [0, 0];
positions["up_end"][3] = [0, 0];
positions["up_end"][4] = [0, 0];
positions["up_end"][5] = [0, 0];
positions["up_end"][6] = [0, 0];
positions["up_end"][7] = [0, 0];
positions["up_end"][8] = [0, 0];


//down arrow start + end positions

positions["down_start"] = [];

positions["down_start"][0] = [-824, -628];
positions["down_start"][1] = [-630, -95];
positions["down_start"][2] = [-326, -594];
positions["down_start"][3] = [-658, -594];
positions["down_start"][4] = [-725, -54];
positions["down_start"][5] = [-823, 12];
positions["down_start"][6] = [-557, -364];
positions["down_start"][7] = [-283, -449];
//unused

//positions["down_start"][9] = [-496,-208];

positions["down_end"] = [];

positions["down_end"][0] = [0, 0];
positions["down_end"][1] = [0, 0];
positions["down_end"][2] = [0, 0];
positions["down_end"][3] = [0, 0];
positions["down_end"][4] = [0, 0];
positions["down_end"][5] = [0, 0];
positions["down_end"][6] = [0, 0];
positions["down_end"][7] = [0, 0];


//setup

function setup() {
    currentSection = -1;
    stage = new createjs.Stage("stage");
    createjs.Ticker.addEventListener("tick", handleTick);


    logo = new createjs.Bitmap("./logo.png");

    logo.x = 546;
    logo.y = 698;

    //assume portrait
    resizeCanvas(true);



    hideVideoPlayer();


}

function hideVideoPlayer() {

    //hide video overlay
    overlay = document.getElementById("video_player_overlay");

    overlay.style.left = -2000;

    //hide video container
    vidContainer = document.getElementById("video_container");

    vidContainer.style.left = -2000;
}


function showVideoPlayer() {

    //hide video overlay
    overlay = document.getElementById("video_player_overlay");

    overlay.style.top = 0;
    overlay.style.left = 0;

    var overlayDomElement = new createjs.DOMElement(overlay);//<---add element to CreateJS container
    stage.addChild(overlayDomElement);
    createjs.Tween.get(overlayDomElement, {loop:false}).to({x:100, y:100}, 1000, createjs.Ease.quadOut);


    //hide video container
    vidContainer = document.getElementById("video_container");

    var vidContainerDomElement = new createjs.DOMElement(vidContainer);//<---add element to CreateJS container

    stage.addChild(vidContainerDomElement);
    vidContainer.style.top = 0;
    vidContainer.style.left = 0;
    createjs.Tween.get(vidContainerDomElement, {loop:false}).to({x:100, y:100}, 1000, createjs.Ease.quadOut);
}


function resizeCanvas(isPortrait) {
    var main = document.getElementById("stage");
    var render = main.getContext("2d");

    if (isPortrait) {
        //portrait mode
        main.style.left = "-320px";
        main.style.top = "-208px";
        main.style.position = "absolute";
    } else {
        //landscape mode
        main.style.left = "-208px";
        main.style.top = "-296px";
        main.style.position = "absolute";
    }
}


function setupUpSequence() {

    stage.removeAllChildren();

    copy_up = new createjs.Bitmap("./tropi_alti.png");

    copy_up.x = 366;
    copy_up.y = 342;


    for (var i = 0; i < upArrowCount; i++) {
        var image = new createjs.Bitmap("./up.png");
        stage.addChild(image);

        image.x = positions["up_start"][i][0];
        image.y = positions["up_start"][i][1];

        image.scaleX = up_sizes[i];
        image.scaleY = up_sizes[i];

        upImages.push(image);
    }


    stage.addChild(logo);

    stage.addChild(copy_up);

    logo.x = 546;
    logo.y = 698;
}


function setupDownSequence() {

    stage.removeAllChildren();

    copy_down = new createjs.Bitmap("./e_bassi.png");
    copy_down.x = 490;
    copy_down.y = 388;

    for (var i = 0; i < downArrowCount; i++) {
        var image = new createjs.Bitmap("./down.png");
        stage.addChild(image);

        image.x = positions["down_start"][i][0];
        image.y = positions["down_start"][i][1];

        image.scaleX = down_sizes[i];
        image.scaleY = down_sizes[i];

        downImages.push(image);
    }

    stage.addChild(logo);
    stage.addChild(copy_down);
    logo.x = 546;
    logo.y = 698;
}


function setupChevronSequence() {
    stage.removeAllChildren();
    chevron0 = new createjs.Bitmap("./chevron.png");
    chevron1 = new createjs.Bitmap("./chevron.png");

    chevron0.x = -650;
    chevron0.y = 0;

    chevron1.x = -1300;
    chevron1.y = 0;

    stage.addChild(chevron0);
    stage.addChild(chevron1);
    stage.addChild(logo);

    var tween1 = createjs.Tween.get(chevron0, {loop: false}).to({x: 300, y: 0}, 2000, createjs.Ease.quadOut);
    var tween2 = createjs.Tween.get(chevron1, {loop: false}).to({x: -400, y: 0}, 2000, createjs.Ease.quadOut);


    stage.addChild(logo);
    logo.x = 546;
    logo.y = 698;

    showVideoPlayer();
}

function setupCTASequence() {


    /*
    var ctaImage = new createjs.Bitmap("./cta.png");

    ctaImage.x = 450;
    ctaImage.y = 450;

    stage.addChild(ctaImage);


    var infoImage = new createjs.Bitmap("./information.png");
    infoImage.x = 450;
    infoImage.y = 450;

    stage.addChild(infoImage);


    var copyImage = new createjs.Bitmap("./cta_copy.png");
    copyImage.x = 450;
    copyImage.y = 450;

    stage.addChild(copyImage); */

}


// Javascript doesn't have built-in support for ranges
// Insted we use arrays of two elements to represent ranges
var mapRange = function (from, to, s) {
    return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};


function handleTick(event) {
    if (started == false) {
        startTime = event.time;
        started = true;
    }

    var section = Math.floor(mapRange([startTime, t_ctaBeginFrame + startTime], [0, 4.1], event.time));

    if (section != currentSection) {
        //section changed - do setup
        switch (section) {
            case 0:
                setupUpSequence();
                break;
            case 1:
                setupDownSequence();
                break;
            case 2:
                setupChevronSequence();
                break;
            case 3:
                setupCTASequence();
                break;
        }
        currentSection = section;
    }

    switch (section) {
        case 0:
            updateUpSequence();
            break;
        case 1:
            updateDownSequence();
            break;
        case 2:
            updateChevronSequence();
            break;
        case 3:
            updateCTASequence();
            break;
    }

    stage.update();
}

function updateDownSequence() {
    for (var i = 0; i < downArrowCount; i++) {
        var image = downImages[i];
        image.x += 11.5 * (5 * down_sizes[i]);
        image.y += 8.5 * (5 * down_sizes[i]);
    }
}

function updateUpSequence() {
    for (var i = 0; i < upArrowCount; i++) {
        var image = upImages[i];
        image.x += 12.5 * (5 * up_sizes[i]);
        image.y -= 6.2 * (5 * up_sizes[i]);
    }
}

function updateChevronSequence() {
    var foo = 0;
}

function updateCTASequence() {
    var bar = 0;
    var foo = bar;
}


