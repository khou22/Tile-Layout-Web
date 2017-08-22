/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: TileLayoutWeb component
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization
import GridView from './GridView.jsx';
import loadingSpinner from './loading-spinner.min.svg';

class TileLayoutWeb extends Component {
    componentDidMount() {
        this.setState({
            gridLoaded: false, // Starts not rendered
            imagesLoaded: 0, // Counter for number of images loaded
        });
        this.props.data.forEach((tile) => {
            const img = new Image();
            img.src = tile.image;
            img.onload = (() => this.loadedImage(true));
            img.onerror = (() => this.loadedImage(false));
        });
    }

    loadedImage(success) {
        const newCount = this.state.imagesLoaded + 1;
        let cuttoffToLoad = this.props.preloadCuttoff; // Number of images required to render before all tiles render
        if (this.props.data.length < cuttoffToLoad) cuttoffToLoad = this.props.data.length;
        if (newCount >= cuttoffToLoad) {
            this.setState({
                gridLoaded: true,
            });
        } else {
            this.setState({
                imagesLoaded: newCount,
            });
        }
    }

    // Render the DOM
    render() {
        // If component isn't mounted yet, return empty
        if (this.state === null) return <span data-note="Component not mounted" />

        // Determine if spinner is needed
        const spinner = !this.state.gridLoaded ? (
            <div className="tile-layout-spinner">
                <span dangerouslySetInnerHTML={{ __html: loadingSpinner }} />
            </div>
        )
        :
        '';
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
                {spinner}
                <GridView
                    gridID={gridID}
                    data={data}
                    modal={modal}
                    columns={columns}
                    textColor={textColor}
                    openNewWindow={openNewWindow}
                />
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
