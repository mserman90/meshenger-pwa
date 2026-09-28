/*
 * MeshengerTR PWA Core Logic
 * Web Audio API Rubble Processor & Disaster Beacon Simulator
 * Copyright (C) 2026 MeshengerTR Contributors
 */

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      console.log('MeshengerTR PWA Service Worker Registered:', reg.scope);
    }).catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
  });
}

// PWA Deferred Install Prompt
let deferredPrompt = null;
const installBtn = document.getElementById('installPwaBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
      deferredPrompt = null;
      installBtn.style.display = 'none';
    }
  });
}

// Tab Switching Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabSections = document.querySelectorAll('.tab-section');

tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    tabBtns.forEach((b) => b.classList.remove('active'));
    tabSections.forEach((s) => s.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// Afet Kipi (Disaster Mode) State
let isBeaconActive = false;
let currentStatus = 'SAFE'; // SAFE, HELP, MEDICAL
let medicalNotes = '';
let beaconInterval = null;
const activeSignalsMap = new Map();

const switchBeacon = document.getElementById('switchBeacon');
const textBeaconStatus = document.getElementById('textBeaconStatus');
const editNotes = document.getElementById('editNotes');
const signalListContainer = document.getElementById('signalListContainer');

switchBeacon.addEventListener('change', (e) => {
  isBeaconActive = e.target.checked;
  if (isBeaconActive) {
    textBeaconStatus.textContent = 'Yayın Açık (Wi-Fi UDP & Mesh Active)';
    textBeaconStatus.classList.add('status-active');
    startBeaconBroadcast();
  } else {
    textBeaconStatus.textContent = 'Yayın Kapalı / Broadcast Inactive';
    textBeaconStatus.classList.remove('status-active');
    stopBeaconBroadcast();

    if (isRubbleListening) {
      stopRubbleAudio();
    }
  }
});

// Status Option Selection
const statusBtns = document.querySelectorAll('.status-btn');
statusBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!isBeaconActive) {
      alert('⚠️ Lütfen önce Afet Kipi Yayınını etkinleştirin!');
      return;
    }

    statusBtns.forEach((b) => {
      b.classList.remove('selected-sos', 'selected-medical', 'selected-safe');
    });

    currentStatus = btn.getAttribute('data-status');

    if (currentStatus === 'HELP') btn.classList.add('selected-sos');
    else if (currentStatus === 'MEDICAL') btn.classList.add('selected-medical');
    else btn.classList.add('selected-safe');

    sendDisasterBeacon();
  });
});

editNotes.addEventListener('input', (e) => {
  medicalNotes = e.target.value;
});

function startBeaconBroadcast() {
  sendDisasterBeacon();
  beaconInterval = setInterval(sendDisasterBeacon, 3000);
  simulateIncomingBeacons();
}

function stopBeaconBroadcast() {
  if (beaconInterval) {
    clearInterval(beaconInterval);
    beaconInterval = null;
  }
}

function sendDisasterBeacon() {
  const signal = {
    senderName: 'Web-PWA-Node (' + navigator.platform + ')',
    status: currentStatus,
    medicalNotes: medicalNotes || 'PWA Emergency Node',
    timestamp: Date.now(),
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 200 + 10)
  };

  activeSignalsMap.set('local-self', signal);
  renderSignalList();
}

function simulateIncomingBeacons() {
  setTimeout(() => {
    if (isBeaconActive) {
      activeSignalsMap.set('node-android-1', {
        senderName: 'Ahmet Yılmaz (Samsung S21)',
        status: 'HELP',
        medicalNotes: 'Floor 2, Enkaz Altı / Blood A Rh+',
        timestamp: Date.now(),
        ipAddress: '192.168.1.45'
      });
      renderSignalList();
    }
  }, 2000);

  setTimeout(() => {
    if (isBeaconActive) {
      activeSignalsMap.set('node-windows-1', {
        senderName: 'Mehmet Kaya (Windows PC)',
        status: 'MEDICAL',
        medicalNotes: 'Tıbbi Yardım İhtiyacı',
        timestamp: Date.now(),
        ipAddress: '192.168.1.100'
      });
      renderSignalList();
    }
  }, 4000);
}

function renderSignalList() {
  if (!signalListContainer) return;

  if (activeSignalsMap.size === 0) {
    signalListContainer.innerHTML = '<p style="text-align:center; color:#94a3b8; padding:20px;">Henüz aktif bir sinyal algılanmadı.</p>';
    return;
  }

  let html = '';
  activeSignalsMap.forEach((sig) => {
    let statusClass = 'safe';
    let statusBadge = '🟢 STATUS OK / SAFE';

    if (sig.status === 'HELP') {
      statusClass = 'sos';
      statusBadge = '🔴 SOS / RED ALERT';
    } else if (sig.status === 'MEDICAL') {
      statusClass = 'medical';
      statusBadge = '🔵 MEDICAL ASSISTANCE';
    }

    const timeStr = new Date(sig.timestamp).toLocaleTimeString();

    html += `
      <div class="signal-card ${statusClass}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong>${sig.senderName}</strong>
          <span style="font-size:0.75rem; font-weight:700; color:white;">${statusBadge}</span>
        </div>
        <p style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">IP: ${sig.ipAddress} • P2P Mesh Signal</p>
        <p style="font-size:0.85rem; color:#cbd5e1; margin-top:2px;">Not: ${sig.medicalNotes}</p>
        <p style="font-size:0.7rem; color:#64748b; margin-top:4px;">Son Yayın: ${timeStr}</p>
      </div>
    `;
  });

  signalListContainer.innerHTML = html;
}

// -------------------------------------------------------------
// Rubble Audio Listener & Amplifier (Web Audio API)
// -------------------------------------------------------------
let audioCtx = null;
let micStream = null;
let sourceNode = null;
let biquadFilter = null;
let gainNode = null;
let analyserNode = null;
let animFrameId = null;
let isRubbleListening = false;
let currentGain = 3;

const switchRubbleAudio = document.getElementById('switchRubbleAudio');
const textRubbleAudioStatus = document.getElementById('textRubbleAudioStatus');
const gainBtns = document.querySelectorAll('.gain-btn');
const audioCanvas = document.getElementById('audioCanvas');
const peakWarningText = document.getElementById('peakWarningText');

switchRubbleAudio.addEventListener('change', async (e) => {
  if (e.target.checked) {
    if (!isBeaconActive) {
      alert('⚠️ Lütfen önce Afet Kipi Yayınını etkinleştirin!');
      e.target.checked = false;
      return;
    }
    await startRubbleAudio();
  } else {
    stopRubbleAudio();
  }
});

gainBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentGain = parseInt(btn.getAttribute('data-gain'), 10);
    gainBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    if (gainNode) {
      gainNode.gain.value = currentGain;
    }

    if (textRubbleAudioStatus && isRubbleListening) {
      textRubbleAudioStatus.textContent = `Dinleme Açık (${currentGain}x Kazanç • Gürültü Filtreli)`;
    }
  });
});

async function startRubbleAudio() {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });

    sourceNode = audioCtx.createMediaStreamSource(micStream);

    // 300Hz High-Pass Filter Node (Cuts low rumble noise <= 300Hz)
    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = 'highpass';
    biquadFilter.frequency.value = 300;

    // Dynamic Gain Amplifier Node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = currentGain;

    // Analyser Node for RMS & Canvas Visualizer
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = 256;

    // Connect Audio Pipeline: Mic -> HighPass -> Gain -> Analyser -> Speakers
    sourceNode.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    gainNode.connect(analyserNode);
    gainNode.connect(audioCtx.destination);

    isRubbleListening = true;
    textRubbleAudioStatus.textContent = `Dinleme Açık (${currentGain}x Kazanç • Gürültü Filtreli)`;
    textRubbleAudioStatus.classList.add('status-active');

    renderAudioCanvas();
  } catch (err) {
    console.error('Microphone access failed:', err);
    alert('⚠️ Mikrofon İzni Gerekli!');
    switchRubbleAudio.checked = false;
  }
}

function stopRubbleAudio() {
  isRubbleListening = false;
  if (switchRubbleAudio) switchRubbleAudio.checked = false;

  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (micStream) micStream.getTracks().forEach((track) => track.stop());
  if (audioCtx) audioCtx.close();

  audioCtx = null;
  micStream = null;

  if (textRubbleAudioStatus) {
    textRubbleAudioStatus.textContent = 'Dinleme Kapalı / Listener Inactive';
    textRubbleAudioStatus.classList.remove('status-active');
  }

  if (peakWarningText) {
    peakWarningText.textContent = 'Ortam Dinleniyor... / Monitoring Audio...';
    peakWarningText.classList.remove('peak-detected');
  }
}

function renderAudioCanvas() {
  if (!isRubbleListening || !analyserNode || !audioCanvas) return;

  const canvasCtx = audioCanvas.getContext('2d');
  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const draw = () => {
    if (!isRubbleListening) return;

    animFrameId = requestAnimationFrame(draw);
    analyserNode.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = '#0f172a';
    canvasCtx.fillRect(0, 0, audioCanvas.width, audioCanvas.height);

    let sum = 0;
    const barWidth = (audioCanvas.width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * audioCanvas.height;
      sum += dataArray[i];

      canvasCtx.fillStyle = '#818cf8';
      canvasCtx.fillRect(x, audioCanvas.height - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }

    // RMS Peak Detection (>65%)
    const avg = sum / bufferLength;
    const amplitudePercentage = Math.min(100, Math.floor((avg / 128) * 100));

    if (amplitudePercentage > 65) {
      peakWarningText.textContent = '⚠️ YÜKSEK SES / TIKIRTI ALGILANDI! (PEAK DETECTED)';
      peakWarningText.classList.add('peak-detected');
    } else {
      peakWarningText.textContent = 'Ortam Dinleniyor... / Monitoring Audio...';
      peakWarningText.classList.remove('peak-detected');
    }
  };

  draw();
}

// -------------------------------------------------------------
// Acoustic Siren (3.5 kHz Whistle Tone) & Strobe SOS
// -------------------------------------------------------------
let whistleAudioCtx = null;
let whistleOsc = null;
let isWhistleActive = false;
let strobeInterval = null;
let isStrobeActive = false;

const btnWhistle = document.getElementById('btnWhistle');
const btnStrobe = document.getElementById('btnStrobe');
const strobeOverlay = document.getElementById('strobeOverlay');

btnWhistle.addEventListener('click', () => {
  if (!isBeaconActive) {
    alert('⚠️ Lütfen önce Afet Kipi Yayınını etkinleştirin!');
    return;
  }

  if (isWhistleActive) {
    stopWhistle();
  } else {
    startWhistle();
  }
});

function startWhistle() {
  whistleAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  whistleOsc = whistleAudioCtx.createOscillator();
  whistleOsc.type = 'sine';
  whistleOsc.frequency.value = 3500; // 3.5 kHz whistle

  whistleOsc.connect(whistleAudioCtx.destination);
  whistleOsc.start();

  isWhistleActive = true;
  btnWhistle.textContent = '🔊 SIREN DURDUR';
  btnWhistle.classList.add('btn-active-red');
}

function stopWhistle() {
  if (whistleOsc) whistleOsc.stop();
  if (whistleAudioCtx) whistleAudioCtx.close();

  whistleOsc = null;
  whistleAudioCtx = null;
  isWhistleActive = false;

  btnWhistle.textContent = '🔊 3.5 kHz DÜDÜK';
  btnWhistle.classList.remove('btn-active-red');
}

btnStrobe.addEventListener('click', () => {
  if (!isBeaconActive) {
    alert('⚠️ Lütfen önce Afet Kipi Yayınını etkinleştirin!');
    return;
  }

  if (isStrobeActive) {
    stopStrobe();
  } else {
    startStrobe();
  }
});

function startStrobe() {
  isStrobeActive = true;
  strobeOverlay.style.display = 'flex';
  btnStrobe.textContent = '🔦 FLAŞ DURDUR';
  btnStrobe.classList.add('btn-active-red');

  let isWhite = true;
  strobeInterval = setInterval(() => {
    strobeOverlay.style.backgroundColor = isWhite ? '#ffffff' : '#dc2626';
    strobeOverlay.querySelector('h2').style.color = isWhite ? '#000000' : '#ffffff';
    isWhite = !isWhite;
  }, 150);
}

function stopStrobe() {
  if (strobeInterval) clearInterval(strobeInterval);
  strobeInterval = null;
  isStrobeActive = false;

  strobeOverlay.style.display = 'none';
  btnStrobe.textContent = '🔦 STROBE FLAŞ';
  btnStrobe.classList.remove('btn-active-red');
}

strobeOverlay.addEventListener('click', stopStrobe);
