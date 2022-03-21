const IMAGE_1 = 'data:image/png;base64,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4iZWDai1pbpzmc2rMltWZ7YMpFf2Ig6h64EobmLVgOi41JLO9i2rMltWtzkD6WUFzFboeiCKm1g1IDqRVHcuvXpZ25qlbav70muWplf0SL4d0YSuB6K4iVUDomikM5teVkgv704tK6R686munHTlpCuX6sohl5G2lLSlpC2NtnR4x30giptYNSAiSgKxakBElARi1YCIKAnEqgERURKIVQMioiQQqwZEREkgVg2IiJJArBoQESWBWDUgIkoCsWpARJQEYtWAiCgJxKoBEVESiFUDIqIkEKsGRERJIFYNiIiSQKwaEBElgVg1ICJKArFqQESUBGLVgIgoCcSqARFREohVAyKiJBCrBkRESSBWDYiIkkCsGhARJYFYNSAiSgKxakBElARi1YCIKAnEqgERURKIVQMioiQQqwZEREkgVg2IiJJArBoQESWBWDUgIkoCsWpARJQEYtWAiCgJxKoBEVESiFUDIqIkEKsGRERJIFYNiIiSQKwaEBElgVg1ICJKArFqQESUBGLVgIgoCcSqARFREohVAyKiJBCrBkRESSBWDYiIkkCsGhARJYFYNSAiSgKxakBElAT/DwFRnm7qwvNXAAAAAElFTkSuQmCC'

let [MX, MY] = [0, 0];
let editor;

/**
 * 
 * @param {MouseEvent} e 
 */
function onMouseMove(e) {
    const { x, y, target } = e;

    const { top, left } = target.getBoundingClientRect()


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

function sStyle() {
    // const tex = document.querySelector('#editor');
    document.querySelector('#pg').innerHTML = editor.getValue();


    html2canvas(document.querySelector(".container")).then((canvas) => {

        const b64 = canvas.toDataURL();


        
        image1.load(b64, async function () {
            /*const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: b64
                })
            });
        
        
            console.log(await response.json());
            */
        });
        
    });
}

function submit(){

    html2canvas(document.querySelector(".container")).then((canvas) => {

        const b64 = canvas.toDataURL();


        
        image1.load(b64, async function () {
            const response = await fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: b64
                })
            });
        
        
            console.log(await response.json());
            
        });
        
    });
}

const diff = true;

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
function render(ctx) {
    if (im1 && im2) {

        for (let i = 0; i < image1.getWidth(); i++) {
            for (let j = 0; j < image1.getHeight(); j++) {
                if (i <= MX) {

                    const R = Math.abs(image1.getIntComponent0(i, j) - (diff ? image2.getIntComponent0(i, j) : 0));
                    const G = Math.abs(image1.getIntComponent1(i, j) - (diff ? image2.getIntComponent1(i, j) : 0));
                    const B = Math.abs(image1.getIntComponent2(i, j) - (diff ? image2.getIntComponent2(i, j) : 0));

                    image_data.data[(j * 400 + i) * 4] = R;
                    image_data.data[(j * 400 + i) * 4 + 1] = G;
                    image_data.data[(j * 400 + i) * 4 + 2] = B;
                } else {
                    image_data.data[(j * 400 + i) * 4] = image2.getIntComponent0(i, j);
                    image_data.data[(j * 400 + i) * 4 + 1] = image2.getIntComponent1(i, j);
                    image_data.data[(j * 400 + i) * 4 + 2] = image2.getIntComponent2(i, j);
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

window.onload = function () {
    const tex = document.querySelector('#editor');
    tex.value = `
<div class="ctn"></div>
<style>
.ctn {
    width: 100px;
    height: 100px;
    background-color: blue;
}
</style>
    `;

    editor = CodeMirror.fromTextArea(tex, {
        lineNumbers: true,
        mode: 'htmlmixed',
        theme: 'dracula',
        width: '100%',
        height: '100%'
    });


    editor.on('keyup', sStyle);
    // editor.setSize(400, 500);

    html2canvas(document.querySelector(".container")).then((canvas) => {
        const b64 = canvas.toDataURL();


        image1.load(b64, function () {
            im1 = true;
        });
    });

    image2.load(IMAGE_1, function () {
        im2 = true;
    });




    const canvas = document.querySelector('#display');

    canvas.onmousemove = onMouseMove;
    canvas.onmouseout = function(){
        MX = 0;
    }

    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    image_data = ctx.createImageData(400, 300);

    ctx.putImageData(image_data, 0, 0);

    requestAnimationFrame(function () {
        render(ctx);
    });

}

