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
                index: 0,
                image: '',
                link: '',
            },
        });
    }

    // If user clicks a tile
    clickedTile(data, id) {
        if (this.props.modal) {
            document.body.style.overflow = 'hidden'; // No scrolling
            if (document.body.clientWidth > 500) document.body.style.marginRight = '17px'; // So there's no shifting with the scroll bar on desktop

            this.setState({
                modalOpen: true,
                selectedPhoto: {
                    index: id,
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

    updateModal(left) {
        const newID = left ? this.state.selectedPhoto.index - 1 : this.state.selectedPhoto.index + 1;
        if (this.props.data.length - newID < 3) this.props.forceLoad(); // If about to extend over, load the next page
        this.setState({
            selectedPhoto: {
                index: newID,
                image: this.props.data[newID].image,
                link: this.props.data[newID].link,
            },
        });
    }

    // Close a modal
    closeModal() {
        this.setState({
            modalOpen: false,
        });
        document.body.style.overflow = 'auto'; // Enable scrolling
        document.body.style.marginRight = 'auto'; // Reset
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
                        index={idCount - 1}
                        id={`gridTile${idCount}`}
                        key={idCount}
                        image={image}
                        link={link}
                        openNewWindow={this.props.openNewWindow}
                        size={size}
                        clickedTile={(data, index) => this.clickedTile(data, index)}
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
                    left={this.state.selectedPhoto.index !== 0}
                    right={this.state.selectedPhoto.index !== this.props.data.length - 1}
                    openNewWindow={this.props.openNewWindow}
                    closeModal={() => this.closeModal()}
                    updateModal={(left) => this.updateModal(left)}
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
    forceLoad: PropTypes.func.isRequired,
};

export default GridView;
