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
import { render } from 'react-dom'
import GridView from './GridView.jsx'; // Get sub-component
import './styles.scss'; // Import styling

const id = 'grid'; // Grid ID base string
console.log(gridData);

render(
    <GridView
        gridID={id}
        data={gridData.data}
        columns={gridData.columns}
        textColor={gridData.textColor}
        openNewWindow={gridData.openNewWindow}
    />, // React.createElement(type, { ...props })
    document.getElementById(id)
);
