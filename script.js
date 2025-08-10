window.onload = () => {

  let history = []; // all musical notes
  let combo = []; // the current musical chord
  let times = []; // the times for each instance
  let reciteIndex = 0; // for playing the music

  const saveBtn = document.getElementById('save-btn');
  const keys = document.querySelectorAll('.key, .black');

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const note = key.getAttribute('data-note');
      key.classList.toggle('active');

      if (key.classList.contains('active')) {
        if (!combo.includes(note)) {
          combo.push(note);
        }
        playSound(note); // play sound on click
      } else {
        combo = combo.filter(n => n !== note);
      }
    });
  });

  // Save current active combo
  saveBtn.addEventListener('click', () => {
    if (combo.length > 0) {
      history.push([...combo]); // clone combo into history
      console.log("Saved:", combo);
      let t = document.getElementById("chord_duration").value;
      //overriding prior feature with new radio buttons feature
       const radios = document.getElementsByClassName("timesel");
	  let selectedValue = null;

	  for (let i = 0; i < radios.length; i++) {
	    if (radios[i].checked) {
	      selectedValue = radios[i].value;
	      break;
	    }
	  }
      t = selectedValue;
      if (t != "1/8" && t != "1/4" && t != "1/2" && t != "2"  && t != "3" && t != "4" && t != "1/3" && t != "2/3" && t != "3/4"){
      	t = "1";
      }
      times.push(t)
      console.log("Time included.");
    }
    combo = [];
    clearAllKeys();
    console.log("History:", history);
  });

  // Highlight one key
  function activateKey(keyName) {
    const selector = keyName.includes("#")
      ? `.black[data-note="${keyName}"]`
      : `.key[data-note="${keyName}"]`;
    const el = document.querySelector(selector);
    if (el) el.classList.add('active');
  }

  // Clear one key
  function deactivateKey(keyName) {
    const selector = keyName.includes("#")
      ? `.black[data-note="${keyName}"]`
      : `.key[data-note="${keyName}"]`;
    const el = document.querySelector(selector);
    if (el) el.classList.remove('active');
  }

  // Clear all active keys
  function clearAllKeys() {
    keys.forEach(key => key.classList.remove('active'));
  }

  // Sleep helper
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // playback function
  async function play() {
    for (const instance of history) {
      clearAllKeys();
      instance.forEach(note => {
        activateKey(note);
        playSound(note); // 🔉 play sound during playback
      });
      // now i need to sleep according to the specified times
      let timeIdx = reciteIndex;
      let waitTime = 1000;
      if (times[timeIdx] == "1/8"){
      	waitTime = 125;
      }
      if (times[timeIdx] == "1/4"){
      	waitTime = 250;
      }
      if (times[timeIdx] == "1/2"){
      	waitTime = 500;
      }
      if (times[timeIdx] == "2"){
      	waitTime = 2000;
      }
      if (times[timeIdx] == "3"){
      	waitTime = 3000;
      }
      if (times[timeIdx] == "4"){
      	waitTime = 4000;
      }
      if (times[timeIdx] == "3/4"){
      	waitTime = 750;
      }
      if (times[timeIdx] == "1/3"){
      	waitTime = 333;
      }
      if (times[timeIdx] == "2/3"){
      	waitTime = 666;
      }
      reciteIndex += 1;
      await sleep(waitTime);
    }
    clearAllKeys();
    reciteIndex = 0;
  }

  // Make play globally accessible for inline onclick in HTML
  window.play = play;

  // Audio map
  const noteAudioMap = {};

  function loadSounds() {
    keys.forEach(key => {
      const note = key.getAttribute('data-note');
     // const audio = new Audio(`sounds/${note}.mp3`);
     const audio = new Audio(`sounds/${encodeURIComponent(note)}.mp3`); // stops problem with sharps

      noteAudioMap[note] = audio;
    });
  }

  function playSound(note) {
    if (noteAudioMap[note]) {
      const clone = noteAudioMap[note].cloneNode(); // allow overlapping
      clone.play();
    }
  }

  loadSounds();
};

