const speech = require('@google-cloud/speech');


// speech to text function
async function speechtotext(mp3) {
    const client = new speech.SpeechClient();
    
    const audio = {
        content: mp3
    };
    
    const config = {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    };
    
    const request = {
        audio: audio,
        config: config
    }
    
    const [response] = await client.recognize(request);
    const transcription = response.results.map(result => 
        result.alternatives[0].transcript).join('\n');
    
    return transcription;
}



module.exports = {
    speech_to_text: speechtotext
}
    


