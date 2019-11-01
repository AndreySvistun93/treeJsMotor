'use strict';

function main() {

  var canvas = document.querySelector('#canvasId');
  const renderer = new THREE.WebGLRenderer({
    canvas
  });
  const fov = 55;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set(20, 20, 20);
  camera.position.z = 30;
  var t = 0

  const controls = new THREE.OrbitControls(camera, canvas);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  {
    const skyColor = 0xD6EBFF; // light blue
    const groundColor = 0xD6EBFF; // brownish orange
    const intensity = 0.8;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.position.set(10, 10, 10);

    scene.add(light);
  }

  {
    const color = 0xD6EBFF;
    const intensity = 0.9;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(20, 20, 20);
    light.target.position.set(0, 0, 0);

    scene.add(light);
    scene.add(light.target);
  }

  var rotetion = 300,
    positionY = 0;
  var massObjectElements = [{
      fileMTL: 'корпусЦентр.mtl',
      fileObject: 'корпусЦентр.obj',
      texture: 'texture/текстура корпус цвет.jpg',
      position: 0,
      nameObject:{
        name: "Aluminum housing with stiffeners and surface cooling",
        listDescription:[
          "strength, lightness and high heat transfer coefficient of the structure;",
          "ability to 'dock' series of samples of equal power on the same shaft;"
        ]
      }
    },
    {
      fileMTL: 'крышка1.mtl',
      fileObject: 'крышка1.obj',
      texture: 'texture/текстура крышки цвет.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'крышка24.mtl',
      fileObject: 'крышка24.obj',
      texture: 'texture/текстура крышки цвет.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'гайки2.mtl',
      fileObject: 'гайки2.obj',
      texture: 'texture/текстура корпус металличность.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'болты2.mtl',
      fileObject: 'болты2.obj',
      texture: 'texture/текстура корпус металличность.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },

    {
      fileMTL: 'магниты1.mtl',
      fileObject: 'магниты1.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "Rotor disks with powerful permanent magnets (NdFeB) installed in it",
        listDescription:[
          "made of aluminum, with heat-dissipation stiffeners;",
          "a high density of constant magnetic flux closed on the round back of magnets;",
          "the magnetic flux is strictly directed along the nearest trajectory with low resistance currents;",
          "the long working life of permanent magnets ≥ 20 years;"
        ]
      }
    },
    {
      fileMTL: 'магниты2.mtl',
      fileObject: 'магниты2.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
     
    },
    {
      fileMTL: 'медная обмотка.mtl',
      fileObject: 'медная обмотка.obj',
      texture: 'texture/med.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'площадка статора.mtl',
      fileObject: 'площадка статора.obj',
      texture: 'texture/текстура корпус цвет.jpg',
      nameObject:{
        name: "The stator in a solid aluminum housing, with installed electromagnetic coils with cores made of soft magnetic composite material.",
        listDescription:[
          "stator winding – coil (toothed), each coil of the stator winding is located on the single prong, number of slots per pole and phase q &lt; 1",
          "low weight, due to the lack of electrical steel;",
          "no induction heating from magnetic fields - low hysteresis losses and cooling requirements of the windings of the coils;",
          "the high specific gravity of 15 kW/kg;",
          "high efficiency 0.98%",
          "maximum smooth running and stable performance in a wide range;"
        ]
      }
    },
    {
      fileMTL: 'подшипники.mtl',
      fileObject: 'подшипники.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "Durable ceramic bearings",
        listDescription:[
          "low friction and no lubrication;",
          "low operating temperature;",
          "no magnetic properties"
        ]
      }
    },
    {
      fileMTL: 'роторная площадка12.mtl',
      fileObject: 'роторная площадка12.obj',
      texture: 'texture/текстура корпус металличность.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'роторная площадка22.mtl',
      fileObject: 'роторная площадка22.obj',
      texture: 'texture/текстура корпус металличность.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'центр вал.mtl',
      fileObject: 'центр вал.obj',
      texture: 'texture/metall_texture.jpg',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'сердечники обмотки.mtl',
      fileObject: 'сердечники обмотки.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'входные отверстия для охлаждения1.mtl',
      fileObject: 'входные отверстия для охлаждения1.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
    {
      fileMTL: 'входные отверстия для проводов1.mtl',
      fileObject: 'входные отверстия для проводов1.obj',
      texture: 'texture/magnits.png',
      position: 0,
      nameObject:{
        name: "",
        listDescription:[]
      }
    },
  ];


  var scrollW = 0,
    heigthElement, scroll;
  window.addEventListener("scroll", scrollWindowEvent);

  function scrollWindowEvent() {
    scrollW = window.pageYOffset || document.documentElement.scrollTop
  }

  THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
  for (let i = 0; i < massObjectElements.length; i++) {
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('mtlFile/');
    mtlLoader.load(massObjectElements[i].fileMTL, (materials) => {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.setPath('objFile/');
      objLoader.load(massObjectElements[i].fileObject, function (object) {
        object.rotation.x = rotetion;
        object.position.y = positionY;

        var texture = new THREE.TextureLoader().load(massObjectElements[i].texture);
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.map = texture;
          }
        });
        scene.add(object);

        var update = function () {
          canvas.addEventListener('mousemove', onDocumentMouseDown, false);

          function name() {
            switch (massObjectElements[i].fileObject) {
              case 'гайки2.obj':
                object.position.y = +scrollW / 300;
                break;
              case 'болты2.obj':
                object.position.y = -scrollW / 200;
                break;
              case 'крышка1.obj':
                object.position.y = -scrollW / 400;
                if (scroll < 50) {
                  
                  if (heigthElement >= 38 && heigthElement < 63) {
                    descriptionObject.style.display = "none";
                    descriptionObject.innerHTML = "";
                    descriptionObject.style.display = "block";
                          descriptionObject.innerHTML = '\
                          <h2 class="number_td">'+massObjectElements[0].nameObject.name+'</h2>\
                           <ul class="name_td" id = "listDescriptionObject" >\
                           </ul>'

                           for(let i = 0 ; i<massObjectElements[0].nameObject.listDescription.length;i++){
                              
                              var liElement=document.createElement('li');
                              liElement.classList.add("listItem");
                              liElement.innerHTML='\
                                  <td >'+massObjectElements[0].nameObject.listDescription[i]+'</td >'
                              listDescriptionObject.appendChild(liElement);
                              
                           }
                  }
                }
                if (scroll > 50) {

                  if ((heigthElement >= 74 && heigthElement < 78) || (heigthElement >= 55 && heigthElement < 62) || (heigthElement >= 22 && heigthElement < 31)) {
                    descriptionObject.style.display = "none";
                    descriptionObject.innerHTML = "";
                    descriptionObject.style.display = "block";
                          descriptionObject.innerHTML = '\
                          <h2 class="number_td">'+massObjectElements[0].nameObject.name+'</h2>\
                           <ul class="name_td" id = "listDescriptionObject" >\
                           </ul>'

                           for(let i = 0 ; i<massObjectElements[0].nameObject.listDescription.length;i++){
                              
                              var liElement=document.createElement('li');
                              liElement.classList.add("listItem");
                              liElement.innerHTML='\
                                  <td >'+massObjectElements[0].nameObject.listDescription[i]+'</td >'
                              listDescriptionObject.appendChild(liElement);
                              
                           }
                  }
                }
                break;
              case 'крышка24.obj':
                object.position.y = +scrollW / 400;
                break;
              case 'площадка статора.obj':

                if (scroll > 50) {
                  if (heigthElement >= 43 && heigthElement < 55) {
                    object.rotation.z += 0.04
                    descriptionObject.style.display = "none";
                    descriptionObject.innerHTML = "";
                    descriptionObject.style.display = "block";
                          descriptionObject.innerHTML = '\
                          <h2 class="number_td">'+massObjectElements[i].nameObject.name+'</h2>\
                           <ul class="name_td" id = "listDescriptionObject" >\
                           </ul>'
                           for(let i = 0 ; i<massObjectElements[8].nameObject.listDescription.length;i++){
                              
                              var liElement=document.createElement('li');
                              liElement.classList.add("listItem");
                              liElement.innerHTML='\
                                  <td >'+massObjectElements[8].nameObject.listDescription[i]+'</td >'
                              listDescriptionObject.appendChild(liElement);
                              
                           }
                  }
                }
                break;
              case 'сердечники обмотки.obj':
                if (scroll > 50) {
                  if (heigthElement >= 43 && heigthElement < 55) {
                    object.rotation.z += 0.04
                  }
                }
                break;
              case 'медная обмотка.obj':
                if (scroll > 50) {
                  if (heigthElement >= 43 && heigthElement < 55) {
                    object.rotation.z += 0.04
                   
                    
                  }
                }
                break;
              case 'магниты1.obj':
                object.position.y = -scrollW / 500;
                if (scroll > 50) {
                  if (heigthElement >= 68 && heigthElement < 73.5) {
                    object.rotation.z += 0.04
                    descriptionObject.style.display = "block";
                          descriptionObject.innerHTML = '\
                          <h2 class="number_td">'+massObjectElements[i].nameObject.name+'</h2>\
                           <ul class="name_td" id = "listDescriptionObject" >\
                           </ul>'
                           for(let i = 0 ; i<massObjectElements[5].nameObject.listDescription.length;i++){

                              var liElement=document.createElement('li');
                              liElement.classList.add("listItem");
                              liElement.innerHTML='\
                                  <td >'+massObjectElements[5].nameObject.listDescription[i]+'</td >'
                              listDescriptionObject.appendChild(liElement);
                              
                           }
                  }
                }
                break;
              case 'магниты2.obj':
                object.position.y = +scrollW / 500;

                break;
              case 'роторная площадка12.obj':
                object.position.y = -scrollW / 500;
                break;
              case 'роторная площадка22.obj':
                object.position.y = +scrollW / 500;
                break;
            }
          }
          name();

        };
        var GameLoop = function () {
          requestAnimationFrame(GameLoop);
          update();
        };
        GameLoop();

      }, onProgress, onError);

      var onProgress = function (xhr) {
        if (xhr.lengthComputable) {}
      };
      var onError = function () {};

    });
  }

  function onDocumentMouseDown(event) {
    scroll = 100 / (document.body.scrollHeight * 0.75 / scrollW);
    heigthElement = 100 / (event.target.offsetHeight / event.y);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();