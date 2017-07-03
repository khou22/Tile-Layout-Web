/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: GridView layout component
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization
import Tile from './tile.jsx'; // Get sub-component

class GridView extends Component {
    // Establish sizing
    componentDidMount() {
        this.windowResize();
        // Add event listener for resizing
        window.addEventListener('resize', this.windowResize);
    }

    // On window resize
    windowResize() {
        setTimeout(() => {
            const width = document.getElementById(this.props.gridID).offsetWidth - 1; // Get width of grid

            this.setState({
                gridWidth: width,
            });
        }, 1);
    }

    // Render the DOM
    render() {
        const gridWidth = (this.state !== null) ? this.state.gridWidth : 0; // Determine grid width

        // Establish standards
        let baseWidth = Math.floor(100 / this.props.columns) / 100; // Get percentage width
        baseWidth *= gridWidth;
        if (gridWidth !== 0) {
            baseWidth += -Math.round(baseWidth / gridWidth); // Slight amount of wiggle room
        } else {
            baseWidth += -1;
        }

        const textColor = this.props.textColor; // Store text color

        let idCount = 0; // Give each tile a unique ID
        const tileNodes = this.props.data.map((tile) => {
            idCount += 1; // Increment counter
            const numBlocks = tile.size; // Number of blocks to fill
            const tileWidth = baseWidth * numBlocks;
            const tileHeight = baseWidth; // Square tile

            // Size information to pass to child
            const size = {
                width: tileWidth,
                height: tileHeight,
            };
            return (
                <Tile
                    id={`gridTile${idCount}`}
                    key={idCount}
                    title={tile.title}
                    subtitle={tile.subtitle}
                    description={tile.description}
                    image={tile.image}
                    link={tile.link}
                    category={tile.category}
                    textColor={textColor}
                    openNewWindow={this.props.openNewWindow}
                    size={size}
                />
            );
        });
        return (
            <div className="main-grid">
                {tileNodes}
            </div>
        );
    }
}

GridView.propTypes = {
    gridID: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        category: {
            label: PropTypes.string.isRequired,
            color: PropTypes.string.isRequired,
        }.isRequired,
    })).isRequired,
    columns: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
};

export default GridView;
