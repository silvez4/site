window.onload = function(){
  // Particles.init({
  //   selector: '.particles-inicio',
  //   color: ['#ff0099', '#05d9e8'],
  //   maxParticles: 120,
  //   connectParticles: true,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       options: {
  //         maxParticles: 60,
  //         color: '#ff0099'
  //       }
  //     }
  //   ]
  // });
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
}
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
let scene, camera, renderer, cube;
let telaC = document.getElementById('telaC');

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.CubeTextureLoader()
  .setPath('imagens/').load([
    'front.png',
    'back.png',
    'top.png',
    'bottom.png',
    'left.png',
    'right.png'
  ]);
  
  renderer = new THREE.WebGLRenderer({canvas: telaC, antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight, 
  1,
  500);
  //const controls = new OrbitControls( camera, renderer.domElement );
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  let luzAmbiente = new THREE.AmbientLight(0xaaaaaa);
  scene.add(luzAmbiente);
  camera.position.set(0,50,200);
  //controls.update();
  // renderer = new THREE.WebGLRenderer({canvas: telaC, antialias: true});
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement);

  // // Criando Cubo
  // const geometry = new THREE.BoxGeometry(3,3,3);
  // const material = new THREE.MeshBasicMaterial( { color: '#FF0099' } );
  // cube = new THREE.Mesh( geometry, material );
  // scene.add( cube );
  //camera.position.z = 5;
  
  //--- Font JetBrains Json ---
  // --- Criando Texto
  let fontLoader = new THREE.FontLoader();
  fontLoader.load('fonts/JetBrains_Mono_Bold.json',function(font){
	let geometrySetting = {
		font: font,
		size:40,
		height:5,
		curveSegments:20,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 0.5,
		bevelSegments: 20
	};
	let textGeoHTML = new THREE.TextGeometry('HTML', geometrySetting);
	let textGeoCSS = new THREE.TextGeometry('CSS', geometrySetting);

	let textMatHTML = new THREE.MeshLambertMaterial({color: 0xcccccc});
	let textMatCSS = new THREE.MeshLambertMaterial({color: 0xcccccc});

	let textHTML = new THREE.Mesh(textGeoHTML, textMatHTML);
	let textCSS = new THREE.Mesh(textGeoCSS, textMatCSS);

	textHTML.position.set(-100,0,20);
	textCSS.position.set(30,0,20);

	scene.add(textHTML);
	scene.add(textCSS);
  });
  
  animate2();
}
function animate2(){
  renderer.render(scene,camera);
  requestAnimationFrame(animate2);
  //controls.update();
}
// function animate() {
//   requestAnimationFrame( animate );
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
// 	renderer.render( scene, camera );
// }
function threeResponsivo(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', threeResponsivo);
init();
//animate();