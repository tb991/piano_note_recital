 let history = [];
    let combo = [];
    const resetBtn = document.getElementById('save-btn');
    const keys = document.querySelectorAll('.key, .black');

    keys.forEach(key => {
      key.addEventListener('click', () => {
        key.classList.toggle('active'); 
        const note = key.getAttribute('data-note');
        combo.push(note)
        if (key.classList.contains('active')) {
        	;
        } 
      });
    });
    resetBtn.addEventListener('click', () => {
      keys.forEach(key => key.classList.remove('active'));
      history.push(combo);
      combo = [];
      console.log(history)
    });
    
function play(){
	console.log(history);
}
function activateKey(keyName){
	var str1 = '.key[data-note=\"???\"]';
	var str2 = '.black[data-note=\"???\"]';
	str1 = str1.replace("???", keyName);
	str2 = str2.replace("???", keyName);
	if (keyName[1] == "#"){
		let keyElement = document.querySelector(str2);
		keyElement.classList.toggle('active');
	}
	else{
		let keyElement = document.querySelector(str1);
		keyElement.classList.toggle('active');
	}

}

function deactivateKey(keyName){
	var str1 = '.key[data-note=\"???\"]';
	var str2 = '.black[data-note=\"???\"]';
	str1 = str1.replace("???", keyName);
	str2 = str2.replace("???", keyName);
	if (keyName[1] == "#"){
		let keyElement = document.querySelector(str2);
		keyElement.classList.remove('active');
	}
	else{
		let keyElement = document.querySelector(str1);
		keyElement.classList.remove('active');
	}

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
window.onload = async function(){
	activateKey("A1");
	activateKey("B1");
	await sleep(1000);
	deactivateKey("A1");
	deactivateKey("B1");
	activateKey("C1");
	activateKey("D1");
}
