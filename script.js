// Инициализация Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Массив для хранения объектов и их скоростей вращения
const objects = [];
const rotationSpeeds = [];

// Цвета для 3D-объектов (исключаем 0x00ffff - неоново-голубой)
const availableColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan (This is neon-cyan, but we'll avoid it elsewhere. Let's add another)
    0xffaa00, // Orange
    0x00aaff, // Light Blue
    0xaa00ff, // Purple
    0x00ffaa, // Mint Green
    0xff00aa, // Hot Pink
    0xaaff00, // Lime Green
    0xaa0000, // Dark Red
    0x00aa00, // Dark Green
    0x0000aa, // Dark Blue
    0xaaaa00, // Olive
    0xaa00aa, // Dark Magenta
    0x00aaaa, // Teal
    0x555555, // Gray
    0xffffff, // White
    0x880088  // Another Purple Shade
];

// Функция для создания случайного объекта
function createRandomObject(index, side) {
    let geometry;
    const objectType = Math.floor(Math.random() * 5); // 5 типов объектов

    switch(objectType) {
        case 0:
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;
        case 1:
            geometry = new THREE.SphereGeometry(0.8, 16, 16);
            break;
        case 2:
            geometry = new THREE.ConeGeometry(0.7, 1.5, 8);
            break;
        case 3:
            geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 64, 16);
            break;
        case 4:
            geometry = new THREE.DodecahedronGeometry(0.7, 0);
            break;
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
    }

    const material = new THREE.MeshBasicMaterial({
        color: availableColors[Math.floor(Math.random() * availableColors.length)],
        wireframe: true
    });

    const object = new THREE.Mesh(geometry, material);

    // Позиционируем объект по краям экрана
    const xPos = side === 'left' ? -window.innerWidth / 4 : window.innerWidth / 4;
    const yPos = (Math.random() - 0.5) * window.innerHeight * 0.8; // Случайная высота в центральной части
    const zPos = (Math.random() - 0.5) * 5; // Случайная глубина
    object.position.set(xPos, yPos, zPos);

    scene.add(object);

    // Генерируем случайные скорости вращения
    rotationSpeeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    });

    return object;
}

// Создаем 10 объектов слева и 10 справа
for (let i = 0; i < 10; i++) {
    objects.push(createRandomObject(i, 'left'));
    objects.push(createRandomObject(i, 'right'));
}

camera.position.z = 10;

// Анимация вращения и движения
function animate() {
    requestAnimationFrame(animate);

    objects.forEach((obj, index) => {
        obj.rotation.x += rotationSpeeds[index].x;
        obj.rotation.y += rotationSpeeds[index].y;
        obj.rotation.z += rotationSpeeds[index].z;
    });

    renderer.render(scene, camera);
}

animate();

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Перепозиционируем объекты при изменении размера
    objects.forEach((obj, index) => {
        const side = index < 10 ? 'left' : 'right';
        const xPos = side === 'left' ? -window.innerWidth / 4 : window.innerWidth / 4;
        obj.position.x = xPos;
    });
});


// Простая обработка формы (пока без отправки на сервер)
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Спасибо за заявку! (Демонстрация работы формы)');
});