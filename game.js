const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);


// カメラ（一人称）
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 1.6, 5);


// レンダラー
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document
    .getElementById("game")
    .appendChild(renderer.domElement);


// ライト
const light = new THREE.DirectionalLight(
    0xffffff,
    1
);

light.position.set(5, 10, 5);

scene.add(light);


// 床
const floorGeometry = new THREE.PlaneGeometry(
    50,
    50
);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);


// 壁作成
function createWall(x, z){

    const geometry = new THREE.BoxGeometry(
        2,
        3,
        2
    );

    const material = new THREE.MeshStandardMaterial({
        color: 0x333333
    });


    const wall = new THREE.Mesh(
        geometry,
        material
    );


    wall.position.set(
        x,
        1.5,
        z
    );


    scene.add(wall);

}


// テスト壁
createWall(0,0);
createWall(2,0);
createWall(-2,0);
createWall(0,-2);



// =====================
// PC移動
// =====================

const keys = {};

window.addEventListener(
    "keydown",
    (e)=>{
        keys[e.key.toLowerCase()] = true;
    }
);


window.addEventListener(
    "keyup",
    (e)=>{
        keys[e.key.toLowerCase()] = false;
    }
);


function movePlayer(){

    const speed = 0.08;


    if(keys["w"]){
        camera.position.z -= speed;
    }

    if(keys["s"]){
        camera.position.z += speed;
    }

    if(keys["a"]){
        camera.position.x -= speed;
    }

    if(keys["d"]){
        camera.position.x += speed;
    }

}



// =====================
// スマホ操作
// =====================

let touchStartX = 0;
let touchStartY = 0;

let moveX = 0;
let moveY = 0;

let lookX = 0;


document.addEventListener(
    "touchstart",
    (e)=>{

        const touch = e.touches[0];

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;

    }
);


document.addEventListener(
    "touchmove",
    (e)=>{

        const touch = e.touches[0];

        const dx =
        touch.clientX - touchStartX;

        const dy =
        touch.clientY - touchStartY;


        // 左側：移動
        if(
            touchStartX <
            window.innerWidth / 2
        ){

            moveX = dx;
            moveY = dy;

        }

        // 右側：視点
        else{

            lookX = dx;

        }

    }
);


document.addEventListener(
    "touchend",
    ()=>{

        moveX = 0;
        moveY = 0;
        lookX = 0;

    }
);



function mobileMove(){

    const speed = 0.002;


    camera.position.x +=
        moveX * speed;


    camera.position.z +=
        moveY * speed;


    camera.rotation.y -=
        lookX * 0.003;

}



// =====================
// 描画
// =====================

function animate(){

    requestAnimationFrame(
        animate
    );


    movePlayer();

    mobileMove();


    renderer.render(
        scene,
        camera
    );

}


animate();



// 画面サイズ変更

window.addEventListener(
    "resize",
    ()=>{

        camera.aspect =
        window.innerWidth /
        window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);
