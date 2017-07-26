/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: GridView layout component
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization
import Tile from './tile.jsx'; // Get sub-component for tile with text
import PhotoTile from './photo-tile.jsx'; // For tiles with just a photo
import PhotoModal from './PhotoModal.jsx'; // On click display the photo larger

class GridView extends Component {
    constructor(props) {
        super(props);
    }

    // Establish sizing
    componentDidMount() {
        this.setState({ // Default states for modal
            modalOpen: false,
            selectedPhoto: {
                image: '',
                link: '',
            },
        });

        this.windowResize();
        // Add event listener for resizing
        window.addEventListener('resize', () => this.windowResize());
    }

    // On window resize
    windowResize() {
        setTimeout(() => {
            const width = document.getElementById(this.props.gridID).offsetWidth - 1; // Get width of grid
            this.setState({ gridWidth: width });
        }, 1);
    }

    // If user clicks a tile
    clickedTile(data) {
        if (this.props.modal) {
            this.setState({
                modalOpen: true,
                selectedPhoto: {
                    image: data.image,
                    link: data.link,
                },
            });
        } else {
            if (this.props.openNewWindow) {
                window.open(data.link, '_blank');
            } else {
                window.open(data.link);
            }
        }
    }

    // Close a modal
    closeModal() {
        this.setState({
            modalOpen: false,
        });
    }

    // Render the DOM
    render() {
        const gridWidth = (this.state !== null) ? this.state.gridWidth : 0; // Determine grid width

        // Establish standards
        let baseWidth = Math.floor(100 / this.props.columns) / 100; // Get percentage width
        baseWidth *= gridWidth;
        if (gridWidth !== 0) {
            baseWidth += -2; // Slight amount of wiggle room
        }
        // console.log(baseWidth);

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
            const {
                title,
                subtitle,
                description,
                image,
                link,
                category,
            } = tile; // Map to individual constants
            if (!title && !subtitle && !description && !category) {
                return (
                    <PhotoTile
                        id={`gridTile${idCount}`}
                        key={idCount}
                        image={image}
                        link={link}
                        openNewWindow={this.props.openNewWindow}
                        size={size}
                        clickedTile={(data) => this.clickedTile(data)}
                    />
                );
            }
            return (
                <Tile
                    id={`gridTile${idCount}`}
                    key={idCount}
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    image={image}
                    link={link}
                    category={tile.category}
                    textColor={textColor}
                    openNewWindow={this.props.openNewWindow}
                    size={size}
                />
            );
        });
        return (
            <div>
                { (this.state && this.state.modalOpen) ? <PhotoModal
                    image={this.state.selectedPhoto.image}
                    link={this.state.selectedPhoto.link}
                    openNewWindow={this.props.openNewWindow}
                    closeModal={() => this.closeModal()}
                    /> : ''
                }
                <div className="main-grid">
                    {tileNodes}
                </div>
            </div>
        );
    }
}

GridView.propTypes = {
    gridID: PropTypes.string.isRequired,
    modal: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        subtitle: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        category: {
            label: PropTypes.string,
            color: PropTypes.string,
        },
    })).isRequired,
    columns: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
};

export default GridView;
