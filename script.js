const box = {
    position: "0 2 -5",
    rotation: "45 45 0",
    scale: "1 1 1",
    animation: "property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true",
    color: "red"
}

const entityModel = {
    url: "./assets/creatures/articuno/scene.gltf",
    position: "0 0 -5",
    rotation: "0 0 0",
    scale: "0.05 0.05 0.05"
}

const createScene = () => {
    const scene = document.querySelector('a-scene');
    scene.setAttribute('fog', 'type: linear; color: #AAA; far: 30; near: 0')
    scene.setAttribute('background', 'color: #007FFF')

    const camera = document.createElement('a-camera');
    camera.setAttribute('rotation-reader', '');
    const cursor = document.createElement('a-cursor');
    cursor.setAttribute('color', '#FAFAFA');
    camera.appendChild(cursor);
    scene.appendChild(camera);

    const plane = document.createElement('a-plane');
    plane.setAttribute('position', '0 0 0');
    plane.setAttribute('rotation', '-90 0 0');
    plane.setAttribute('width', '100');
    plane.setAttribute('height', '100');
    plane.setAttribute('color', '#7BC8A4');
    scene.appendChild(plane);
}
const createEntity = (model) => {
    let entity = document.createElement('a-box');
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


function removeEntity(){  
}
function addEntity(){  
    const entity = createEntity(entityModel);
    const scene = document.querySelector('a-scene');
    scene.appendChild(entity);
}