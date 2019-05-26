'use strict';
function main() {

  var canvas = document.querySelector('#c');
  
  const renderer = new THREE.WebGLRenderer({canvas});
  const fov = 55;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.set( 20, 20, 20);
  camera.position.z = 30;
  var t=0

  const controls = new THREE.OrbitControls(camera, canvas);
  // controls.target.set(0, 1, 0);
  // controls.update();
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  {
    const skyColor = 0xD6EBFF;  // light blue
    const groundColor = 0xD6EBFF;  // brownish orange
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

   var rotetion = 300,positionY=0;
  var massObjectElements = [
    {
      fileMTL:'корпусЦентр.mtl',
      fileObject:'корпусЦентр.obj',
      texture: 'текстура корпус цвет.jpg',
      position: 0
    },
    {
      fileMTL:'крышка1.mtl',
      fileObject:'крышка1.obj',
      texture: 'текстура крышки цвет.jpg',
      position: 0
    },
    {
       fileMTL:'крышка24.mtl',
      fileObject:'крышка24.obj',
      texture: 'текстура крышки цвет.jpg',
      position: 0
    }, 
    {
      fileMTL:'гайки2.mtl',
      fileObject:'гайки2.obj',
      texture: 'текстура корпус металличность.jpg',
      position: 0
    },
    {
      fileMTL:'болты2.mtl',
      fileObject:'болты2.obj',
      texture: 'текстура корпус металличность.jpg',
      position: 0
    },
    
    {
      fileMTL:'магниты1.mtl',
      fileObject:'магниты1.obj',
      texture: 'magnits.png',
      position: 0
    }, 
    {
       fileMTL:'магниты2.mtl',
      fileObject:'магниты2.obj',
      texture: 'magnits.png',
      position: 0
    },
    {
      fileMTL:'медная обмотка.mtl',
      fileObject:'медная обмотка.obj',
      texture: 'med.jpg',
      position: 0
    }
    , 
    {
      fileMTL:'площадка статора.mtl',
      fileObject:'площадка статора.obj',
      texture: 'текстура корпус цвет.jpg',
      
     }, 
    {
      fileMTL:'подшипники.mtl',
      fileObject:'подшипники.obj',
      texture: 'magnits.png',
      position: 0
    },
    {
       fileMTL:'роторная площадка12.mtl',
      fileObject:'роторная площадка12.obj',
      texture: 'текстура корпус металличность.jpg',
      position: 0
    }, 
    {
      fileMTL:'роторная площадка22.mtl',
      fileObject:'роторная площадка22.obj',
      texture: 'текстура корпус металличность.jpg',
      position: 0
    }, 
    {
      fileMTL:'центр вал.mtl',
      fileObject:'центр вал.obj',
      texture: 'metall_texture.jpg',
      position: 0
    },
    {
       fileMTL:'сердечники обмотки.mtl',
      fileObject:'сердечники обмотки.obj',
      texture: 'magnits.png',
      position: 0
    },
    {
      fileMTL:'входные отверстия для охлаждения1.mtl',
      fileObject:'входные отверстия для охлаждения1.obj',
      texture: 'magnits.png',
      position: 0
    },
    {
      fileMTL:'входные отверстия для проводов1.mtl',
      fileObject:'входные отверстия для проводов1.obj',
      texture: 'magnits.png',
      position: 0
    },
    // {
    //     // fileMTL:'окружность.mtl',
    //     fileObject:'окружность.obj',
    //     texture: 'крышка амбиент.jpg',
    //     position: 0
    //   }
  ];


  var scrollW = 0,heigthElement,scroll;
  window.addEventListener("scroll",scrollWindowEvent);

  function scrollWindowEvent(){
    scrollW= window.pageYOffset || document.documentElement.scrollTop
  }

  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
    for(let i = 0 ;i<massObjectElements.length;i++){
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('mtlFile/');
    mtlLoader.load(massObjectElements[i].fileMTL, (materials) => {
      materials.preload();
      var objLoader = new THREE.OBJLoader();
      objLoader.setMaterials( materials );
      objLoader.setPath( 'objFile/' );
      objLoader.load(massObjectElements[i].fileObject, function ( object ) {
        object.rotation.x = rotetion;
        object.position.y = positionY;
        //  object.position.x = massObjectElements[i].position;
        //  object.position.z = massObjectElements[i].position;
        var texture = new THREE.TextureLoader().load(massObjectElements[i].texture);
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
            child.material.map = texture;
          }
        });
          scene.add( object );
         
          var update = function() {
            canvas.addEventListener( 'mousemove', onDocumentMouseDown, false );
            // canvas.addEventListener( 'mouseout', onDocumentMouseMouseout, false );
            function name(){
              switch(massObjectElements[i].fileObject){
                case 'гайки2.obj': object.position.y = +scrollW/300;   break;
                case 'болты2.obj': object.position.y = -scrollW/200;   break;
                case 'крышка1.obj': object.position.y = -scrollW/400;  break;
                case 'крышка24.obj': object.position.y = +scrollW/400;  break;
                case 'площадка статора.obj':

                if(scroll>50){
                  if(heigthElement>=43 && heigthElement<55){object.rotation.z += 0.04}
                }  break;
                case 'сердечники обмотки.obj':if(scroll>50){
                  if(heigthElement>=43 && heigthElement<55){object.rotation.z += 0.04}
                }  break;
                case 'медная обмотка.obj':if(scroll>50){
                  if(heigthElement>=43 && heigthElement<55){object.rotation.z += 0.04}
                }  break;
                case 'магниты1.obj': 
                object.position.y = -scrollW/500; 
                if(scroll>50){
                  if(heigthElement>=68 && heigthElement<73.5){object.rotation.z += 0.04}
                }
                 break;
                case 'магниты2.obj': 
                object.position.y = +scrollW/500;
                 
                 break;
                case 'роторная площадка12.obj': object.position.y = -scrollW/500;  break;
                case 'роторная площадка22.obj': object.position.y = +scrollW/500;  break;
              }
            }
            name();
           
          };
          var GameLoop = function() {
            requestAnimationFrame(GameLoop);
            update();
          };
          GameLoop();
       
      },onProgress, onError );

      var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
        }
      };
      var onError = function () { };

    });
  }
  function onDocumentMouseDown( event ) {
     scroll = 100/(document.body.scrollHeight*0.75/scrollW);
     heigthElement =100/(event.target.offsetHeight/event.y);
     console.log(scrollW)
      console.log(scroll)
      console.log(heigthElement/scroll)
  }
  // function onDocumentMouseMouseout( event ) {
  //   const scroll = 100/(document.body.scrollHeight*0.75/scrollW);
  //    heigthElement =100/(event.target.offsetHeight/event.y);
  //   console.log(heigthElement)
  // }
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = window.innerWidth;
    const height =  window.innerHeight;
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
