import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PointLight,
  AmbientLight,
  OrthographicCamera,
  MeshLambertMaterial,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  // 场景
  const [scene, setScene] = useState();
  // 相机
  const [camera, setCamera] = useState();

  // 初始化场景必须的组件
  const initSceneProperty = () => {
    setScene(new Scene());
    setCamera(
      new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      )
    );
    // setCamera(new OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10));
    // camera.position.set(1, 0, 5);
  };

  // 添加一个正方体模型
  const createBox = (geo, mat) => {
    return new Mesh(geo, mat);
  };

  useEffect(() => {
    initSceneProperty();
  }, []);

  useEffect(() => {
    if (!camera && !scene) return;
    let dom = document.getElementById("canvas");
    console.log(dom.clientWidth);

    let geometry = new BoxGeometry(1, 1, 1);
    // let material = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    let material = new MeshLambertMaterial({
      color: 0xffff00,
      emissive: 0xff0000,
    });
    let box1 = createBox(geometry, material);
    scene.add(box1);

    camera.position.z = 5;

    //点光源
    var point = new PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new AmbientLight(0x444444);
    scene.add(ambient);

    var renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    function animate() {
      requestAnimationFrame(animate);
      box1.position.y += 0.01;
      box1.rotation.y += 0.1
      renderer.render(scene, camera);
    }
    animate();
    new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement);
  }, [camera, scene]);

  return <div className="App" id="canvas"></div>;
}

export default App;
