
var inputSentence, analyzeTopicsButton, analyzePeopleButton, analyzeButton, submitButton;
var longString;
var inputString;
var rawText1,rawText2,rawText3,rawText4;
var dropdown;
var canvas;

function setup() {
	loadData();
	initPageElement();
}

function loadData(){
	rawText1 = loadStrings("data/Bon Jovi Always.txt")
	rawText2 = loadStrings("data/State of Union 05.txt")
	rawText3 = loadStrings("data/Weezer Lyrics.txt")
	rawText4 = loadStrings("data/Friends Episode Transcript.txt")

}

function initPageElement(){
	longString = createP('');
	longString.parent('text-holder');

	// inputSentence = createInput('');
	// inputSentence.size(800,200);
	// inputSentence.parent('text-holder');
	// inputSentence.class('textField');

	dropdown = createSelect();
	dropdown.size(300);
	dropdown.class('buttons');
	dropdown.parent('dropdown-holder');
	dropdown.option('Bon Jovi Always');
	dropdown.option('State of Union 05');
	dropdown.option('Weezer');
	dropdown.option('Friends Transcript');
	// dropdown.changed(dropdownSelect);

	submitButton = createButton("Select Text");
	submitButton.class('submitButton');
	submitButton.parent('dropdown-holder');

	analyzeTopicsButton = createButton("Analyze Topics");
	analyzeTopicsButton.class('buttons');
	analyzeTopicsButton.parent('buttons-holder');

	analyzePeopleButton = createButton("Analyze People");
	analyzePeopleButton.class('buttons');
	analyzePeopleButton.parent('buttons-holder');

	analyzeButton = createButton("Analyze");
	analyzeButton.class('buttons');
	analyzeButton.parent('buttons-holder');

	canvas = createCanvas(500,500);
	canvas.parent('canvas-holder');

	submitButton.mousePressed(dropdownSelect);
	analyzeTopicsButton.mousePressed(analyzeTopics);
	analyzePeopleButton.mousePressed(analyzePeople);
	analyzeButton.mousePressed(nlpTest);


}

function dropdownSelect(){
	longString.style('height','200px');
	clear();

	var itemSelected = dropdown.value();
	if (itemSelected === 'Bon Jovi Always'){
		longString.html(rawText1);
		inputString = '';
		inputString = rawText1;
	} else if (itemSelected === 'State of Union 05') {
		longString.html(rawText2);
		inputString = '';
		inputString = rawText2;
	} else if (itemSelected === 'Weezer') {
		longString.html(rawText3);
		inputString = '';
		inputString = rawText3;
	} else if (itemSelected === 'Friends Transcript') {
		longString.html(rawText4);
		inputString = '';
		inputString = rawText4;
	}
}

function nlpTest(){
	clear();
	var nlpString = nlp(inputString);
	var contractions = nlpString.contractions().out('frequency');
	var dates = nlpString.dates().out('terms');
	var ngrams = nlpString.ngrams().out('terms');
	var place = nlpString.places().out('frequency');

	var query = place;
	console.log(query);
	// createBar(place);
}


function analyzeTopics(){
	clear();
	var nlpString = nlp(inputString);
	var topics = nlpString.topics().out('frequency');
	console.log(topics);
	createBar(topics);
}

function analyzePeople(){
	clear();
	var nlpString = nlp(inputString);
	var people = nlpString.people().out('frequency');
	createBar(people);
}

function analyzeVerbs(){
	clear();
	var nlpString = nlp(inputString);
	var people = nlpString.people().out('frequency');
}

function createBar(object){
	var width = 500, // canvas width and height
	    height = 500,
	    margin = 20,
	    w = width - 2 * margin, // chart area width and height
	    h = height - 2 * margin;

	textSize(14);


	var barWidth =  (h / object.length) * 0.8; // width of bar
	// var barMargin = (h / object.length) * 0.2; // margin between two bars
	var barMargin =8;

	for (var i = 0; i < object.length; i++) {
	  push();
	    fill('#4CAF50');
	    noStroke();
	    translate(0, i* (barWidth + barMargin)); // jump to the top right corner of the bar
	    rect(0, 0, object[i].percent, barWidth); // draw rect

	    fill('#4CAF50');
	    text(object[i].normal+" "+object[i].percent+"%", 100, barWidth/2 + 5); // write data
    pop();
	}
}
