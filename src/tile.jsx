/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: 'Tile' sub-component
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization

class Tile extends Component {
    constructor(props) {
        super(props);
        this.setState({
            hover: false,
            descriptionHeight: 0,
        });
    }

    componentDidMount() {
        window.setTimeout(() => {
            // Get height of description text
            const height = document.getElementById(this.props.id).offsetHeight;

            // Save
            this.setState({
                descriptionHeight: height,
            });
        }, 1); // Wait for it to load before getting the height
    }

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
        return parseInt(this.props.id.replace(/\D/g, ''), 10); // Get integer out of ID
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

        // Setup if opening in new window
        let target = '';
        if (this.props.openNewWindow) {
            target = '_blank';
        }

        const tileStyle = {
            width: this.props.size.width,
            height: this.props.size.height,
            animationDelay: `${delay}s`,
        };

        // console.log(this.props.id + ': ' + this.state.descriptionHeight);
        const bottom = -this.state.descriptionHeight - 8;
        const tileTextStyle = {
            color: this.props.textColor,
            bottom: `${bottom} px`,
        };

        const tileCategoryStyle = {
            backgroundColor: this.props.category.color,
        };

        // Inline style for line breaks
        const categoryTitleBreak = {
            lineHeight: '32px',
        };
        const tileSubtitleBreak = {
            lineHeight: '32px',
        };
        const subtitleDescriptionBreak = {
            lineHeight: '56px',
        };

        // Background image
        const backgroundStyle = {
            backgroundImage: `url(${this.props.image})`,
        };

        // Hover classes
        let backgroundClass = 'tile-background'; // Background class
        let tileTextClass = 'tile-text'; // Tile text

        // If hovering
        if (this.state.hover) {
            backgroundClass = `${backgroundClass} tile-background-hover`;
            tileTextClass = `${tileTextClass} tile-text-hover`;
        }

        return (
            <a className={`tile ${entranceAnimation}`} href={this.props.link} style={tileStyle} target={target} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div className="tile-content">
                    <div className={tileTextClass} style={tileTextStyle}>
                        <div className="tile-category" style={tileCategoryStyle}>{this.props.category.label}</div><br style={categoryTitleBreak} />
                        <span className="tile-title">{this.props.title}</span><br style={tileSubtitleBreak} />
                        <span className="tile-subtitle">{this.props.subtitle}</span><br style={subtitleDescriptionBreak} />
                        <span className="tile-description" id={this.props.id}>{this.props.description}</span><br />
                    </div>
                </div>

                <div className={backgroundClass} style={backgroundStyle} />
            </a>
        );
    }
}

Tile.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
    size: {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }.isRequired,
};

export default Tile; // Make available for other files
