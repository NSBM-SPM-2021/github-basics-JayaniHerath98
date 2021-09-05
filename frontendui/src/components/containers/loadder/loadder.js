import React from 'react';
import './loadder.css';
import { BarLoader, BeatLoader } from "react-spinners";

export default function Loadder(){
    return (
        <div className="text-center loadder">
            <i class="fas fa-spinner font-special"></i>
            {/* <BeatLoader/> */}
        </div >
    );
}
