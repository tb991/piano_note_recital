window.onload = () => {

  let history = [];
  let combo = [];

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
      await sleep(1000);
    }
    clearAllKeys();
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

