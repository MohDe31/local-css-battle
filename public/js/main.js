let IMAGE_1;
let [MX, MY] = [-1, -1];
let editor;
let uname;
let prevDoc;
/**
 *
 * @param {MouseEvent} e
 */

function onMouseMove(e) {
  const { x, y, target } = e;

  const { top, left } = target.getBoundingClientRect();

  const xPos = x - left;
  const yPos = y - top;

  MX = xPos;
  MY = yPos;
}

const image1 = new MarvinImage();
const image2 = new MarvinImage();

let im1 = false;
let im2 = false;

let image_data;

async function sStyle() {
  // const tex = document.querySelector('#editor');
  prevDoc.body.innerHTML = editor.getValue();

  const canv = await html2canvas(prevDoc.body);
  const b64 = canv.toDataURL();

  image1.load(b64);
}

async function submit() {
  const canv = await html2canvas(prevDoc.body);
  const b64 = canv.toDataURL();
  image1.load(b64, async function () {
    if (!uname) {
      alert("SOMETHING WENT WRONG");
    }
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: uname,
        data: b64,
      }),
    });

    if (response.status !== 200) {
      alert("something went wrong please report to the admin!");
      location.reload();
    }
    const json = await response.json();

    if (json.success) {
      startSplashScreen(parseFloat(json.percentage));
    }

    // alert(`You got ${Math.round(json.percentage)}%!`);
  });
}

const diff = true;

function startSplashScreen(percentage) {
  const splash = document.querySelector(".splash");
  const perc = document.querySelector("#perc");
  const perc_ctn = document.querySelector("#perc-ctn");
  perc.innerHTML = percentage.toFixed(2) + "%";
  splash.classList.toggle("show");
  perc_ctn.setAttribute(
    "style",
    `clip: rect(0px, calc(var(--w) * ${percentage / 100}), var(--h), 0px)`
  );
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 */
function render(ctx) {
  if (im1 && im2) {
    for (let i = 0; i < image1.getWidth(); i++) {
      for (let j = 0; j < image1.getHeight(); j++) {
        // image_data.data[(j * 400 + i) * 4] = image1.getIntComponent0(i, j);
        // image_data.data[(j * 400 + i) * 4 + 1] = image1.getIntComponent1(i, j);
        // image_data.data[(j * 400 + i) * 4 + 2] = image1.getIntComponent2(i, j);

        if (i <= MX) {
          const R = Math.abs(
            image1.getIntComponent0(i, j) -
              (diff ? image2.getIntComponent0(i, j) : 0)
          );
          const G = Math.abs(
            image1.getIntComponent1(i, j) -
              (diff ? image2.getIntComponent1(i, j) : 0)
          );
          const B = Math.abs(
            image1.getIntComponent2(i, j) -
              (diff ? image2.getIntComponent2(i, j) : 0)
          );

          image_data.data[(j * 400 + i) * 4] = R;
          image_data.data[(j * 400 + i) * 4 + 1] = G;
          image_data.data[(j * 400 + i) * 4 + 2] = B;
        } else {
          image_data.data[(j * 400 + i) * 4] = image2.getIntComponent0(i, j);
          image_data.data[(j * 400 + i) * 4 + 1] = image2.getIntComponent1(
            i,
            j
          );
          image_data.data[(j * 400 + i) * 4 + 2] = image2.getIntComponent2(
            i,
            j
          );
        }

        image_data.data[(j * 400 + i) * 4 + 3] = 255;
      }
    }

    ctx.putImageData(image_data, 0, 0);
  }

  requestAnimationFrame(function () {
    render(ctx);
  });
}

window.onload = async function () {
  prevDoc = document.getElementById("preview").contentWindow.document;
  prevDoc.body.style.height = "300px";
  prevDoc.body.style.width = "400px";
  prevDoc.body.style.background = "white";
  prevDoc.body.style.overflow = "hidden";

  const tex = document.querySelector("#editor");
  tex.value = `
<div class="ctn"></div>
<style>
* {
    margin: 0;
    padding: 0;
}
.ctn {
    width: 100px;
    height: 100px;
    background-color: blue;
}
</style>
    `;

  editor = CodeMirror.fromTextArea(tex, {
    lineNumbers: true,
    mode: "htmlmixed",
    theme: "dracula",
    width: "100%",
    height: "100%",
  });

  editor.on("keyup", sStyle);
  // editor.setSize(400, 500);

  prevDoc.body.innerHTML = tex.value;

  const response = await fetch("/challenge");
  const json = await response.json();

  IMAGE_1 = json.data;

  const canv = await html2canvas(prevDoc.body);
  const b64 = canv.toDataURL();

  image1.load(b64, function () {
    im1 = true;
  });

  image2.load(IMAGE_1, function () {
    im2 = true;
  });

  const canvas = document.querySelector("#display");

  canvas.onmousemove = onMouseMove;
  canvas.onmouseout = function () {
    MX = -1;
  };

  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");

  image_data = ctx.createImageData(400, 300);

  ctx.putImageData(image_data, 0, 0);

  uname = localStorage.getItem("uname");

  if (!uname) {
    uname = prompt("Please enter a username").trim().split(" ").join("_");

    localStorage.setItem("uname", uname);
  }

  requestAnimationFrame(function () {
    render(ctx);
  });
};
