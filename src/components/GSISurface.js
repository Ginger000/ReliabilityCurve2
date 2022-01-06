import { useSpring, animated,config } from '@react-spring/three'
import React, {useState, useRef, useEffect} from 'react';

const GSISurface = ({position, args, color, GSIRatio}) => {
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 1.5, 3)
    },[])

    const {GSIScale} = useSpring({
        GSIScale:[1,1,GSIRatio],
        config:{duration:1000}
    })
    return (
        <animated.mesh position={position} ref={mesh} scale={GSIScale}>
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" color={color} />
        </animated.mesh>
    )
}

export default GSISurface
