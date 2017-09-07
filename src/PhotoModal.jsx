/**************************************************************
 * Name: Kevin Hou
 * License: MIT
 *
 * Description: The modal that can render if user clicks on tile
 *
 **************************************************************/
import React, { Component } from 'react'; // Get React modules
import PropTypes from 'prop-types'; // Helps with prop organization

// Left and right arrows
import leftCarrot from './left-carrot.svg';
import rightCarrot from './right-carrot.svg';

class PhotoModal extends Component {

    // Determine if an element is the child element of another node
    // Credit: https://stackoverflow.com/questions/2234979/how-to-check-in-javascript-if-one-element-is-contained-within-another @Asaph
    static isDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    // Pressed image
    openLink() {
        const hasLink = (this.props.link && this.props.link !== ''); // Bool to track if link
        if (!hasLink) return; // Don't open anything

        if (this.props.openNewWindow) {
            window.open(this.props.link, '_blank');
        } else {
            window.open(this.props.link);
        }
    }

    clickLeft() {
        this.props.updateModal(true);
    }

    clickRight() {
        this.props.updateModal(false);
    }

    clickedBackground(event) {
        const left = document.getElementById('modal-left');
        const right = document.getElementById('modal-right');
        if (this.isDescendant(left, event.target)) return;
        if (this.isDescendant(right, event.target)) return;

        // console.log('Clicked background, closing modal...');
        this.props.closeModal();
    }

    // Render the DOM
    render() {
        const hideLeft = this.props.left ? '' : 'modal-arrow-hide';
        const hideRight = this.props.right ? '' : 'modal-arrow-hide';

        return (
            <div className="modal-background" onClick={(event) => { this.clickedBackground(event); }} role="button" tabIndex="0">
                <div className="modal-close">
                    <a onClick={this.props.closeModal} title="Close" role="button" tabIndex="0">X</a>
                </div>
                <div
                    id="modal-left"
                    onClick={() => { this.clickLeft(); }}
                    className={`modal-arrow ${hideLeft}`}
                    dangerouslySetInnerHTML={{ __html: leftCarrot }}
                    role="button"
                    tabIndex="0"
                />
                <div className="modal-main">
                    <img
                        src={this.props.image}
                        className="modal-image"
                        alt=""
                        onClick={() => this.openLink()}
                        role="button"
                        tabIndex="0"
                    />
                </div>
                <div
                    id="modal-right"
                    onClick={() => { this.clickRight(); }}
                    className={`modal-arrow ${hideRight}`}
                    dangerouslySetInnerHTML={{ __html: rightCarrot }}
                    role="button"
                    tabIndex="0"
                />
            </div>
        );
    }
}

PhotoModal.propTypes = {
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    left: PropTypes.bool.isRequired,
    right: PropTypes.bool.isRequired,
    openNewWindow: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    updateModal: PropTypes.func.isRequired,
};

export default PhotoModal;
