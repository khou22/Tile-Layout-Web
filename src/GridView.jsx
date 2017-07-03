/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: GridView layout component
 *
 **************************************************************/
import React, {
    Component
}
from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization
import Tile from './tile.jsx'; // Get sub-component

class GridView extends Component {
    // Constructor
    constructor(props) {
        super(props);
        this.setState({
            data: props.data,
            numColumns: props.columns, // Number of columns in grid
            textColor: props.textColor, // Color of the text
            newWindow: props.openNewWindow, // If will open new window
            gridWidth: 0,
        }); // Will override immediately
    }

    // Establish sizing
    componentDidMount() {
        this.windowResize(); // Establish window size

        // Add event listener for resizing
        window.addEventListener('resize', this.windowResize);
    }

    // On window resize
    windowResize() {
        const gridWidth = $('#' + gridID).width() - 1; // Get width of grid

        this.setState({
            gridWidth: gridWidth,
        });

        // console.log('Set width to: ' + gridWidth);
    }

    // Render the DOM
    render() {
        // Establish standards
        let baseWidth = this.state.gridWidth * Math.floor(100 / this.state.numColumns) / 100; // Get percentage width
        if (this.state.gridWidth != 0) {
            baseWidth += -Math.round(baseWidth / this.state.gridWidth) - 4; // Slight amount of wiggle room
        }
        else {
            baseWidth += -8;
        }

        const textColor = this.state.textColor; // Store text color
        const newWindow = this.state.newWindow;

        let idCount = 0; // Give each tile a unique ID
        const tileNodes = this.state.data.map(function(tile) {
            idCount++; // Increment counter
            const numBlocks = tile.size; // Number of blocks to fill
            const width = baseWidth * numBlocks;
            const height = baseWidth; // Square tile

            // Size information to pass to child
            const size = {
                width: width,
                height: height,
            }
            return (<Tile id={'gridTile' + idCount} title={tile.title} subtitle={tile.subtitle} description={tile.description} image={tile.image} link={tile.link} category={tile.category} textColor={textColor} openNewWindow={newWindow} size={size} />);
        });
        return (
            <div className='main-grid'>
                {tileNodes}
            </div>
        );
    }
}

export default GridView;
