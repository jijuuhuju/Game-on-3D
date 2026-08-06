const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);


// カメラ（一人称視点）
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

document.getElementById("game").appendChild(renderer.domElement);


// ライト
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);


// 床
const floorGeometry = new THREE.PlaneGeometry(50, 50);

const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x555555
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;
scene.add(floor);


// 壁を作る関数
function createWall(x, z) {

    const wallGeometry = new THREE.BoxGeometry(
        2,
        3,
        2
    );

    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333
    });

    const wall = new THREE.Mesh(
        wallGeometry,
        wallMaterial
    );

    wall.position.set(
        x,
        1.5,
        z
    );

    scene.add(wall);
}


// テスト用の壁
createWall(0, 0);
createWall(2, 0);
createWall(-2, 0);
createWall(0, -2);


// 描画
function animate(){

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );
}

animate();


// 画面サイズ変更対応
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
