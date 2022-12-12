//Add carosoul
const images = [
    "https://i.imgur.com/vOjufSn.png", "https://i.imgur.com/X9jTjst.png", "https://i.imgur.com/D5W9urg.png", "https://i.imgur.com/z2TnGWH.png", "https://i.imgur.com/wFqbbUl.png", "https://i.imgur.com/rbw5z7j.png"]

  //Set up for a setInverval event
  let index = 0

  function swapPhoto() {
    $img1 = $("#carousel")
    index += 1
    if (index >= images.length) {
      index = 0
    }

    $img1.attr("src", images[index])
  }

  setInterval(function () {
    swapPhoto()
  }, 2500)