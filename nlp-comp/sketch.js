
var inputSentence, analyzeTopicsButton, analyzeNounButton, analyzeButton;
var longString;
var inputString;
var rawText1,rawText2,rawText3,rawText4;
var dropdown;

function setup() {
	noCanvas();
	initPageElement();


}

function loadData(){
	rawText1 = loadStrings("data/Bon Jovi Always.txt")
	rawText2 = loadStrings("data/State of Union 05.txt")
	rawText3 = loadStrings("data/Weezer Lyrics.txt")
	rawText4 = loadStrings("data/Friends Episode Transcript.txt")
}

function initPageElement(){
	inputSentence = createInput("");
	inputSentence.size(300);
	inputSentence.parent('sketch-holder');

	dropdown = createSelect();
	dropdown.size(300);
	dropdown.class('buttons');
	dropdown.parent('')

	analyzeTopicsButton = createButton("Analyze Topics");
	analyzeTopicsButton.class('buttons');
	analyzeTopicsButton.parent('buttons-holder');

	analyzeNounButton = createButton("Analyze Noun");
	analyzeNounButton.class('buttons');
	analyzeNounButton.parent('buttons-holder');

	analyzeButton = createButton("Analyze");
	analyzeButton.class('buttons');
	analyzeButton.parent('buttons-holder');


	analyzeTopicsButton.mousePressed(analyzeTopics);
	analyzeNounButton.mousePressed(analyzeNoun);
	analyzeButton.mousePressed(nlpTest);

}

function nlpTest(){
	inputString = inputSentence.value();
	var nlpString = nlp(rawText);

	var people = nlpString.people().out('text');
	var topics = nlpString.topics().out('frequency');
	var verbs = nlpString.verbs().slice(0,50).out('frequency')

	console.log(topics);

	var output = topics;
}

function analyzeTopics(){
	var topics = nlp(longString).topics();
	console.log(topics.list[0]);

	// var output = '';
	// for (var i = 0; i < topics.list.length; i++) {
  //
	// }
  //
	// createP(topics);
}

function analyzeNoun(){
	var noun = nlp(longString).nouns();
	console.log(noun);
	createP(noun);
}
