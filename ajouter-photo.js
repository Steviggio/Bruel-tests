function ajouterPhoto() {
    var input = document.getElementById("modal-add-input");
    var image = input.files[0];
  
    var reader = new FileReader();
    reader.onload = function(e) {
      var canvas = document.createElement("canvas");
      var img = document.createElement("img");
      img.src = e.target.result;
  
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
  
      var preview = document.getElementById("photoPreview");
      preview.appendChild(canvas);
    };
    reader.readAsDataURL(image);
  }