import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){
    return(
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-auto border-top border-secondary bg-dark p-5">
                <div className="text-white">
                    <h1>ViGameList</h1>
                    <p>Facebook</p>
                </div>
                <div className="text-white d-flex flex-row flex-wrap gap-3">
                    <p>Home</p>
                    <p>FAQ</p>
                    <p>About</p>
                    <p>Copyright</p>
                </div>
            </footer>
    );
}

export default Footer;