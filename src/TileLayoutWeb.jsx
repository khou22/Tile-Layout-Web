/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: TileLayoutWeb component
 *              Will handle lazy loading/pagination
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization
import GridView from './GridView.jsx';
import loadingSpinner from './loading-spinner.min.svg';

class TileLayoutWeb extends Component {
    componentDidMount() {
        const lazyLoadSize = this.props.columns * 5;
        this.setState({
            gridLoaded: false, // Starts not rendered
            imagesLoaded: 0, // Counter for number of images loaded
            paginationSize: Math.min(lazyLoadSize, this.props.data.length), // Load x images at a time
            loadUntilIndex: Math.min(lazyLoadSize * 2, this.props.data.length), // Initially load the first two pages
            activeTiles: this.props.data.slice(0, lazyLoadSize), // Only load first page
            loaded: Array(this.props.data.length).fill(false), // Track which are loaded
        }, () => {
            this.loadActive();
        }); 
    }

    loadActive() {
        // Determine where to start so don't load the same images
        let start = 0;
        for (let index = 0; index < this.state.loaded.length; index++) {
            const loaded = this.state.loaded[index];
            console.log(`Image: ${index} is ${loaded}`);
            if (!loaded) {
                start = index;
                break;
            }
        };

        console.log(`Loading images from ${start} to ${this.state.loadUntilIndex}`);

        for (let i = 0; i < this.state.loadUntilIndex; i++) {
            const tile = this.props.data[i]; // Load from the master data object
            const img = new Image();
            img.src = tile.image;
            img.onload = (() => this.loadedImage(i));
            img.onerror = (() => this.loadedImage(i));
        };
    }

    loadedImage(key) {
        const updatedLoaded = { ...this.state.loaded };
        updatedLoaded[key] = true; // Loaded
        this.setState({
            loaded: updatedLoaded,
        }); // Update state
    }

    loadNextPage() {
        console.log('Loading next page');
        let newEnd = this.state.loadUntilIndex;
        let newLoadEnd = this.state.loadUntilIndex + this.state.paginationSize; // Increment

        // Check limits
        if (this.props.data.length < newEnd) newEnd = this.props.data.length;
        if (this.props.data.length < newLoadEnd) newLoadEnd = this.props.data.length;

        this.setState({
            activeTiles: this.props.data.slice(0, newEnd),
            loadUntilIndex: newLoadEnd,
        }, () => {
            this.loadActive(); // Begin loading next page
        });
    }

    // Render the DOM
    render() {
        // If component isn't mounted yet, return empty
        if (this.state === null) return <span data-note="Component not mounted" />
    
        const {
            gridID,
            data,
            modal,
            columns,
            textColor,
            openNewWindow,
        } = this.props;
        return (
            <div>
                <GridView
                    gridID={gridID}
                    data={this.state.activeTiles}
                    modal={modal}
                    columns={columns}
                    textColor={textColor}
                    openNewWindow={openNewWindow}
                />
                <button onClick={() => this.loadNextPage()}>Load More</button>
            </div>
        );
    }
}

TileLayoutWeb.propTypes = {
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
    preloadCuttoff: PropTypes.number.isRequired,
};

export default TileLayoutWeb;
