prediction1 = "";
prediction2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90 
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version -', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iOK2DSc4C/model.json',modelloaded);

function modelloaded()
{
    console.log("modelloaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speakData1 = "First prediction is"+ prediction1;
    speakData2 = "Second prediction is"+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotresult);
}

function gotresult(error,result)
{
    if(error)
    {
        console.error(error);
    }else
    {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if(result[0].label == "angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128127;"
        }
        if(result[0].label == "normal")
        {
            document.getElementById("update_emoji").innerHTML = "&#128528;"
        }
        if(result[0].label == "happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128512;"
        }
        if(result[0].label == "sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128533;"
        }
        if(result[1].label == "angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128127;"
        }
        if(result[1].label == "normal")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128528;"
        }
        if(result[1].label == "happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128512;"
        }
        if(result[1].label == "sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128533;"
        }
        
    }
}