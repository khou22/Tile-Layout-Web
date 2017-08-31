/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: 'Photo-Tile' sub-component
 *              No text content
 *              Zooms on hover - no filter change
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization

class PhotoTile extends Component {
    // Start hover
    onMouseEnter() {
        this.setState({
            hover: true,
        });
    }

    // End hover
    onMouseLeave() {
        this.setState({
            hover: false,
        });
    }

    // Get its place in the order of tiles (ie. first tile is 1, second is 2)
    getTileRank() {
        const id = this.props.id;
        return parseInt(id.replace(/\D/g, ''), 10); // Get integer out of ID
    }

    // User clicked the photo tile
    clickedTile() {
        const data = {
            image: this.props.image,
            link: this.props.link,
        };
        this.props.clickedTile(data);
    }

    render() {
        const rank = this.getTileRank(); // Get the tile's rank/order
        let delay = (rank * 0.05) + 0.05; // Delay in seconds
        let entranceAnimation = 'tile-entrance'; // Standard entrance animation class

        // If the 30th tile or greater, don't animate entrance
        // Only slows down the load time
        if (rank >= 20) {
            delay = 0; // Don't delay (probably not neccessary since we're removing the animation)
            entranceAnimation = 'tile-skip-entrance'; // Skip the animation
        }

        const tileStyle = {
            width: this.props.size.width,
            paddingTop: this.props.size.height,
            animationDelay: `${delay}s`,
            cursor: 'pointer',
        };

        // Background image
        const backgroundStyle = {
            backgroundImage: `url(${this.props.image})`,
        };

        // Hover classes
        let backgroundClass = 'photo-tile-background'; // Background class

        // If hovering
        if (this.state !== null && this.state.hover) {
            backgroundClass = `${backgroundClass} photo-tile-background-hover`;
        }

        return (
            <a
                className={`tile ${entranceAnimation}`}
                id={this.props.id}
                onClick={() => this.clickedTile()}
                role="link"
                tabIndex="0"
                style={tileStyle}
                onMouseEnter={() => { this.onMouseEnter(); }}
                onMouseLeave={() => { this.onMouseLeave(); }}
            >
                <div className={backgroundClass} style={backgroundStyle} />
            </a>
        );
    }
}

PhotoTile.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
    size: PropTypes.shape({
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired,
    }).isRequired,
    clickedTile: PropTypes.func.isRequired,
};

export default PhotoTile; // Make available for other files
