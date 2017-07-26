/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: The modal that can render if user clicks on tile
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization

class PhotoModal extends Component {

    // Pressed image
    openLink() {
        if (this.props.openNewWindow) {
            window.open(this.props.link, '_blank');
        } else {
            window.open(this.props.link);
        }
    }

    // Render the DOM
    render() {
        // Determine if new window
        let target = '';
        if (this.props.openNewWindow) {
            target = '_blank';
        }

        return (
            <div className="modal-background" onClick={this.props.closeModal} role="Close">
                <div className="modal-close">
                    <a onClick={this.props.closeModal} title="Close" role="Close">X</a>
                </div>
                <div className="modal-main">
                    <img src={this.props.image} className="modal-image" alt="" onClick={() => this.openLink()} />
                </div>
            </div>
        );
    }
}

PhotoModal.propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default PhotoModal;
