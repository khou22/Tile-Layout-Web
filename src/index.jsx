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
import GridView from './GridView.jsx'; // Get sub-component
import './styles.scss'; // Import styling

const gridID = 'grid'; // Grid id
const mobileCuttoff = 800; // Number of piexels for cuttoff to mobile
React.render(
    React.createElement(GridView, [
        data: gridData.data,
        numColumns: gridData.numColumns,
        textColor: gridData.textColor,
        newWindow: gridData.newWindow,
    ]), // React.createElement(type, [props])
    document.getElementById(gridID)
);
