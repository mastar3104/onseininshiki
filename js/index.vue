<template>
    <div id="app">
        <img id="icon" src="../img/icon.png">
        <div id="result-div">
            <span style="color:#FFFFFF;">{{ result }}</span>
            <i style="color:#aaa">{{ interimTranscript }}</i>
        </div>
        <div id="console">
            <input type="text" v-model="manualInput" @change="setManualInput">
            <button id="start-btn" @click="mikeStart">start</button>
            <button id="stop-btn" @click="mikeStop">reset</button>
        </div>
    </div>
</template>

<script>
  import https from 'https'
  const httpsAgent = https.Agent({ rejectUnauthorized: false })
  module.exports = {
      name: 'tableList',
      data() {
        return {
          recognition: null,
          result: "",
          manualInput: "",
          interimTranscript: "",
        }
      },
      mounted() {
        let SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'ja-JP';
        this.recognition.interimResults = true;
        this.recognition.continuous = true;
        this.recognition.onend = (event) => {
          this.recognition.start();
        }

        this.recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            let transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              this.interimTranscript = '';
              this.result = transcript
              this.ondoku(transcript)
            } else {
              this.interimTranscript = transcript;
            }
          }
        }
      },
      methods: {
        mikeStart() {
          this.recognition.start();
        },
        mikeStop() {
          this.recognition.stop();
        },
        ondoku(kanji) {
          let audio = new Audio()
          audio.src = "https://www.yukumo.net/api/v2/aqtk1/koe.mp3?type=f1&kanji=" + kanji
          audio.load();
          audio.addEventListener('ended', (e) => {
            setTimeout(this.clearResult(kanji), 3000)
          });
          audio.play();
        },
        setManualInput() {
          this.result = this.manualInput
          this.ondoku(this.manualInput)
        },
        clearResult(result) {
          return () => {
            if (this.result === result) {
              this.result = ''
              this.recognition.stop();
            }
          }
        }
      }
    }
</script>
