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
    // Establish sizing
    componentDidMount() {
        this.setState({ // Default states for modal
            modalOpen: false,
            selectedPhoto: {
                image: '',
                link: '',
            },
        });
    }

    // If user clicks a tile
    clickedTile(data) {
        if (this.props.modal) {
            document.body.style.overflow = 'hidden'; // No scrolling
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
        document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Render the DOM
    render() {
        // Establish standards
        let baseWidth = Math.floor(100 / this.props.columns); // Get percentage width

        const textColor = this.props.textColor; // Store text color

        let idCount = 0; // Give each tile a unique ID
        const tileNodes = this.props.data.map((tile) => {
            idCount += 1; // Increment counter
            const numBlocks = tile.size; // Number of blocks to fill
            const tileWidth = `${baseWidth * numBlocks}%`;
            const tileHeight = `${baseWidth}%`; // Square tile

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
                        key={idCount}
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
                    key={idCount}
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
        category: PropTypes.shape({
            label: PropTypes.string,
            color: PropTypes.string,
        }),
    })).isRequired,
    columns: PropTypes.number.isRequired,
    textColor: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
};

export default GridView;
