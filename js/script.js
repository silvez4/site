window.onload = function(){
  particlesJS('inicio',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ff0099"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 2,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ff0099",
        "opacity": 0.4,
        "width": 2
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "bounce",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }
  );

  const menuBtn = document.querySelector('.menu-mobile');
  const menu = document.querySelector('.menu');
  let menuAtivo = false;
  menuBtn.addEventListener('click', () => {
    if(!menuAtivo){
      menuBtn.classList.add('open');
      menu.classList.add('open');
      menuAtivo = true;
    } else{
      menuBtn.classList.remove('open');
      menu.classList.remove('open');
      menuAtivo = false;
    }
  });

  //---  Animação com Three js ---
  let scene, camera, renderer; 
  
  function init() {
    container = document.getElementById( 'impressao' );
    scene = new THREE.Scene();
    initFundo();
    initCamera();
    initRenderer();
    initTexto();
    initForma();
  }
  function initFundo(){
    scene.background = new THREE.CubeTextureLoader()
    .setPath('imagens/').load([
      'right.png',
      'left.png',
      'top.png',
      'bottom.png',
      'front.png',
      'back.png'
    ]);
  }
  
  function initCamera(){
    camera = new THREE.PerspectiveCamera(55, 
      container.offsetWidth / container.offsetHeight, 
    1,
    500);
    let luzAmbiente = new THREE.AmbientLight(0xffffff);
    scene.add(luzAmbiente);
    camera.position.set(0,50,200);
    // ATIVAR CONTROLE COM MOUSE
    // var controls = new THREE.OrbitControls( camera, renderer.domElement );
    //controls.update();
  }

  function initRenderer(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    container.appendChild( renderer.domElement );
  }
  function initTexto(){
    //--- Font JetBrains Json ---
    // --- Criando Texto
    let fontLoader = new THREE.FontLoader();
    fontLoader.load('fonts/JetBrains_Mono_Bold.json',function(font){
      let geometrySetting = {
        font: font,
        size:30,
        height:5,
        curveSegments:20,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 0.5,
        bevelSegments: 20
      };
      let textGeo1 = new THREE.TextGeometry('Deixe', geometrySetting);
      let textGeo2 = new THREE.TextGeometry('Sua', geometrySetting);
      let textGeo3 = new THREE.TextGeometry('Marca', geometrySetting);

      let textMatRosa = new THREE.MeshLambertMaterial({color: 0xff0099});
      let textMatAzul = new THREE.MeshLambertMaterial({color: 0x05d9e8});

      let text1 = new THREE.Mesh(textGeo1, textMatRosa);
      let text2 = new THREE.Mesh(textGeo2, textMatAzul);
      let text3 = new THREE.Mesh(textGeo3, textMatRosa);

      text1.position.set(-100,100,20);
      text2.position.set(20,50,20);
      text3.position.set(-100,0,20);
      scene.add(text1);
      scene.add(text2);
      scene.add(text3);
    });
  }

  function initForma(){
    // // Criando Cubo
    const geoCubo = new THREE.BoxGeometry(13,13,13);
    const materialC = new THREE.MeshBasicMaterial( { color: '#7B04EB' } );
    cubo = new THREE.Mesh( geoCubo, materialC );

    const geoEsfera = new THREE.SphereGeometry( 15, 32, 16 );
    const geoEsfera2 = new THREE.SphereGeometry( 7.5, 16, 8, 3 );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color1: {
          value: new THREE.Color(0xff0099)
        },
        color2: {
          value: new THREE.Color(0x64fdfa)
        }
      },
      vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
      `,
      fragmentShader: `
      uniform vec3 color1;
      uniform vec3 color2;
      
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
      }
      `,
      wireframe: true
    });
    
    esfera = new THREE.Mesh( geoEsfera, material ); 
    esfera2 = new THREE.Mesh( geoEsfera2, material ); 
    // esfera3 = new THREE.Mesh( geoEsfera2, material ); 
    
    esfera.position.set(-30, 60, 20);
    esfera2.position.set(0, 20, 20);
    cubo.position.set(0, 0, 0);
    
    scene.add(esfera);
    scene.add(esfera2);
    scene.add(cubo);
    // scene.add(esfera3);
    
    pivotPoint = new THREE.Object3D();
    esfera.add(pivotPoint);
    pivotPoint.add(esfera2);
    pivotPoint.add(cubo);
  }
  
  function rodarEsfera() {
    let vel = 0.005;
    let time = Date.now() * 0.0005;
    esfera.rotation.x -= vel;
    esfera.rotation.y -= vel;
    // esfera.rotation.z -= vel;
	  esfera2.position.x = Math.cos( time * 7 ) * 3;
	  cubo.position.x = Math.cos( time * 10 ) * 5;
    pivotPoint.rotation.x += 0.05;
	  // esfera.position.y = Math.cos( time * 7 ) * 3;
	  // esfera.position.z = Math.cos( time * 8 ) * 4;
}
  function threeResponsivo(){
    // camera.aspect = window.innerWidth / window.innerHeight;
    // camera.aspect = 200 / 200;
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.setSize( 200, 200 );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }
  
  function animate() {
    requestAnimationFrame( animate );
    rodarEsfera();
    // stats.update();
    // camera.rotation.x += 0.01;
    // camera.rotation.y += 0.005;
    renderer.render( scene, camera );
  }
  
  window.addEventListener('resize', threeResponsivo);
  init();
  animate();
}