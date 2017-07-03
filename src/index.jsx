/**************************************************************
* Name: Kevin Hou
* License: MIT
*
* Description: Entry point for Tile layout library
*
* Usage:
*  <script src="data.js"></script>
*  <div id="grid"></div>
*  <script type="text/jsx;harmoney-true" src="tile-layout-library/main.js"></script>
*
**************************************************************/
import React from 'react';
import { render } from 'react-dom';
import GridView from './GridView.jsx'; // Get sub-component
import './styles.scss'; // Import styling

const id = 'grid'; // Grid ID base string
const targetElement = document.getElementById(id); // Get element
const data = gridData; // Master data object
// console.log(data); // Debugging to see what data is being passed in
if (data === null) {
    render(
        <div>
            <p>Make sure your data object is defined before including the tile-layout-library</p>
        </div>,
        targetElement,
    );
}

render(
    <GridView
        gridID={id}
        data={data.data}
        columns={data.columns}
        textColor={data.textColor}
        openNewWindow={data.openNewWindow}
    />,
    targetElement,
);
