const box = {
    position: "0 2 -5",
    rotation: "45 45 0",
    scale: "1 1 1",
    animation: "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true",
    color: "red"
}

const entityModel = {
    url: "./assets/articuno/scene.gltf",
    position: "0 0 -10",
    rotation: "0 0 0",
    scale: "0.05 0.05 0.05"
}

const createScene = () => {
}
const createEntity = (model) => {
    let entity = document.createElement('a-entity');
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('position', model.position);
    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('animation-mixer', '');

    return entity;
}
const createBox = (model) => {
    let entity = document.createElement('a-box');
    entity.setAttribute('scale', model.scale);
    entity.setAttribute('rotation', model.rotation);
    entity.setAttribute('position', model.position);
    entity.setAttribute('color', model.color);
    //entity.setAttribute('animation', model.animation); 

    return entity;
}


function removeEntity() {
    const entity = document.querySelector('a-entity[gltf-model]');
    if (entity)
        entity.parentNode.removeChild(entity);
}
function addEntity() {
    if (!document.querySelector('a-entity[gltf-model]')) {
        const entity = createEntity(entityModel);
        const scene = document.querySelector('a-scene');
        scene.appendChild(entity);
    }
}

let isArWorld = false;
function AFrame(){
    if (!isArWorld)
        return;

    isArWorld = false;
    // clearInterval(interval);
    const scene = document.querySelector('a-scene')
    scene.removeAttribute('arjs-webcam-texture');
    const cameraToRemove = document.querySelector('a-camera')
    if (cameraToRemove) {
        cameraToRemove.parentNode.removeChild(cameraToRemove);
        cameraToRemove.destroy();
    }
    document.querySelectorAll('a-entity').forEach(e => {
        e.parentNode.removeChild(e);
        e.destroy();
    });

    const camera = document.createElement('a-camera');
    camera.setAttribute('rotation-reader', '');
    const cursor = document.createElement('a-cursor');
    cursor.setAttribute('color', '#FAFAFA');
    camera.appendChild(cursor);
    scene.appendChild(camera);

    const env = document.createElement('a-entity');
    env.setAttribute('environment', 'preset: forest; dressingAmount: 500');
    scene.appendChild(env);

    scene.appendChild(createEntity(entityModel))
    scene.render();
}

function ARjs(){
    if (isArWorld)
        return;

    isArWorld = true;
    const scene = document.querySelector('a-scene')
    scene.removeAttribute('fog');
    scene.removeAttribute('background');
    scene.setAttribute('arjs-webcam-texture', '');
    const cameraToRemove = document.querySelector('a-camera')
    if (cameraToRemove) {
        cameraToRemove.parentNode.removeChild(cameraToRemove);
        cameraToRemove.destroy();
    }

    document.querySelectorAll('a-entity').forEach(e => {
        e.parentNode.removeChild(e);
        e.destroy();
    });
    document.querySelectorAll('a-plane').forEach(e => {
        e.parentNode.removeChild(e);
        e.destroy();
    });

    const camera = document.createElement('a-camera');
    camera.setAttribute('rotation-reader', '');
    camera.setAttribute("gps-camera", "");
    scene.appendChild(camera);

    const ambient = document.createElement('a-entity');
    ambient.setAttribute('light', 'type: ambient; color: #BBB');
    const directional = document.createElement('a-entity');
    directional.setAttribute('light', 'type: directional; color: #FFF; intensity: 0.6');
    directional.setAttribute('position', '-0.5 1 1');
    scene.appendChild(ambient);
    scene.appendChild(directional);

    scene.appendChild(createEntity(entityModel));
    
    scene.render();
}