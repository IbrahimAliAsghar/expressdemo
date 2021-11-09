    var webcamElement = document.getElementById('webcam');
    var canvasElement = document.getElementById('canvas');
    var snapSoundElement = document.getElementById('snapSound');
    var webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

    webcam.start()
    .then(result => {
    console.log("webcam started");
    })
    .catch(err => {
    console.log(err);
    });




    $(function(){

        $("#take_picture").click(function(){
            let picture = webcam.snap();
    // document.querySelector('#download-photo').src = picture;

            var data = new FormData();
        //var files = $("#uploadEditorImage").get(0).files;
        //if (files.length > 0) {
            data.append("HelpSectionImages", picture);
    // }
            $.ajax({
                url: "CurrentImage",
                type: "POST",
                data: data,
                success: function (response) {
                    //code after success

                },
                error: function (er) {
                    alert(er);
                }

            });
        });


    })
