(((drawModule) => {

  const btn = document.getElementById('btn');
  btn.addEventListener("click", () => {
    drawModule.init();
  });

  document.onkeydown = event => {
    const keyCode = event.keyCode;

    switch (keyCode) {

      case 37:
        if (direction != 'right') {
          direction = 'left';
        }
        break;

      case 39:
        if (direction != 'left') {
          direction = 'right';
        }
        break;

      case 38:
        if (direction != 'down') {
          direction = 'up';
        }
        break;

      case 40:
        if (direction != 'up') {
          direction = 'down';
        }
        break;
    }
  };


}))(drawModule);
