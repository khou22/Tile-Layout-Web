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
const Waypoint = require('react-waypoint'); // Execute function when scroll to element
import GridView from './GridView.jsx'; // Get main grid view
import loadingSpinner from './loading-spinner.min.svg'; // Loading spinner

class TileLayoutWeb extends Component {
    componentDidMount() {
        const lazyLoadSize = this.props.columns * 5;
        this.setState({
            gridLoaded: false, // Starts not rendered
            imagesLoaded: 0, // Counter for number of images loaded
            paginationSize: Math.min(lazyLoadSize, this.props.data.length), // Load x images at a time
            loadStart: 0, // Start at the beginning
            loadEnd: Math.min(lazyLoadSize * 2, this.props.data.length), // Initially load the first two pages
            activeTiles: this.props.data.slice(0, lazyLoadSize), // Only load first page
            onWaypoint: false, // Whether user is viewing the cuttoff point
        }, () => {
            this.loadActive();
        }); 
    }

    loadActive() {
        for (let i = this.state.loadStart; i < this.state.loadEnd; i++) {
            const tile = this.props.data[i]; // Load from the master data object
            const img = new Image();
            img.src = tile.image;
            img.onload = (() => this.loadedImage()); // On load event
            img.onerror = (() => this.loadFailed(i)); // Image failed to load
        };
    }

    loadedImage() {
        const count = this.state.imagesLoaded; // Store old value
        this.setState({ imagesLoaded: count + 1 }, () => { this.checkCount() }); // Increment
    }

    loadFailed(index) {
        console.log(`Image #${index + 1} failed to load`);
        
        const count = this.state.imagesLoaded; // Store old value
        this.setState({ imagesLoaded: count + 1 }, () => { this.checkCount() }); // Increment
    }

    // Check whether to programatically load next page
    checkCount() {
        if (this.state.imagesLoaded === this.state.loadEnd && this.state.onWaypoint) {
            this.loadNextPage();
        }
    }

    onWaypoint() {
        this.setState({
            onWaypoint: true,
        });
        this.loadNextPage(); // Load next page if on waypoint
    }

    offWaypoint() {
        this.setState({
            onWaypoint: false,
        });
    }

    loadNextPage() { 
        if (this.state.imagesLoaded === this.state.loadEnd) { // Next page isn't loaded yet
            let newStart = this.state.loadEnd; // First index not on page
            let newLoadEnd = this.state.loadEnd + this.state.paginationSize; // Increment

            // Check limits
            if (this.props.data.length < newStart) newStart = this.props.data.length;
            if (this.props.data.length < newLoadEnd) newLoadEnd = this.props.data.length;

            this.setState({
                activeTiles: this.props.data.slice(0, newStart),
                loadStart: newStart,
                loadEnd: newLoadEnd,
            }, () => {
                this.loadActive(); // Begin loading next page
            });
        }
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
                    forceLoad={() => this.loadNextPage()}
                />
                <Waypoint onEnter={() => this.onWaypoint()} onLeave={() => this.offWaypoint()}>
                    { this.props.data.length > this.state.activeTiles.length ? (
                        <div className="tile-layout-spinner">
                            <span dangerouslySetInnerHTML={{ __html: loadingSpinner }} />
                        </div>
                    ) : null
                    }
                </Waypoint>
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
