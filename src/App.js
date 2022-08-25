import logo from './logo.svg';
import './App.css';
import {Canvas, useFrame} from "@react-three/fiber";
import { useEffect, useRef, useState } from 'react';
import {useGLTF} from "@react-three/drei";
import {PresentationControls} from "@react-three/drei/web/PresentationControls";
import {ContactShadows} from "@react-three/drei/core/ContactShadows";




function App() {

  function Box(props) {
    const ref = useRef();
    const [hovered, sethover] = useState(false);

    useEffect(() => {
      console.log(hovered);
    }, [hovered]);

    useFrame(() => {
      ref.current.rotation.y += 0.01; 
      ref.current.rotation.x += 0.01; 
    });
    return (
      <mesh ref={ref} {...props} 
        onPointerOver={(e) => sethover(true)} 
        onPointerOut={(e) => sethover(false)} 
        scale={hovered ? 1.5 : 1}>

        <boxGeometry args={[2, 2, 2]}/>
        <meshStandardMaterial color={hovered ? "orange": "red"}/>
      </mesh>
    );
  }

  function Watch(props) {

    const ref = useRef();

    const {nodes, materials} = useGLTF("../Objects/watch-v1.glb");


    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh 
          castShadow
          receiveShadow
          geometry={nodes.Object006_watch_0.geometry}
          material={materials.watch}/>

      </group>
      
    );
  }

  function Drill(props){
    const ref = useRef();
    const {nodes, materials} = useGLTF("../Objects/AssemblyModel.glb");

    return (
      <group ref={ref} {...props} dispose={null}>
        <mesh 
          castShadow
          receiveShadow
          geometry={nodes.AssemblyModel.geometry}>
          <meshStandardMaterial color={"orange"}/>
        </mesh>

      </group>
      
    );
  }

  /*<Box position = {[-3.2,0,0]}/>
          <Box position = {[3.2,0,0]}/>*/
  return (
    <div className="App">
      <div>
        <h1>Hello</h1>
        <Canvas shadows dpr={[1, 2]} camera={{position: [0,0,50], fov: 10}} style={{ height: "50vh"}}>
          <ambientLight intensity={0.5}></ambientLight>
          <spotLight position={[10,10,10]}/>
          <PresentationControls
            global
            snap={{ mass: 4, tension: 1500}}
            config={{mass: 2, tension: 500}}
            polar={[-Math.PI / 3, Math.PI / 2]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
            <Drill rotation={[0, 0, 0]} position={[0, 0, -10]} scale={0.01}/>
          </PresentationControls>
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -4.4, 0]}
            opacity={0.75}
            blur={2.6}
            >

          </ContactShadows>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
