import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Gallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import Button from './Button/Button';
import fetchImage from './Services/fetchImage';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    images: [],
    helpState: 'whatever',
    isModalState: false,
    modalImg: '',
    isLoad: true,
  };
  componentDidMount() {
    this.renderGallery();
  }
  async componentDidUpdate() {
    this.renderGallery();
  }

  async renderGallery() {
    const response = await fetchImage(this.state.query, this.state.page);
    this.falseLoad();
    if (this.state.helpState === 'whatever') {
      if (this.state.page === 1) {
        this.setState({ images: response.hits });
      }
      if (this.state.page > 1) {
        this.setState({ images: [...this.state.images, ...response.hits] });
      }
    }
  }
  trueLoad = () => {
    this.setState({ isLoad: true });
  };
  falseLoad = () => {
    this.setState({ isLoad: false });
  };
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const query = form.elements.query.value;
    this.setState({ query: query });
    this.setState({ page: 1 });
    this.setState({ helpState: 'whatever' });
    form.reset();
    this.trueLoad();
  };
  loadMore = () => {
    this.setState({ helpState: 'whatever' });
    this.setState({ page: this.state.page + 1 });
  };
  showModal = e => {
    console.log(e.target.dataset.source);
    this.setState({ modalImg: e.target.dataset.source });
    this.setState({ isModalState: true });
  };
  clsModal = () => {
    this.setState({
      isModalState: false,
    });
  };

  render() {
    return (
      <div className={styles.App}>
        <Searchbar submitForm={this.handleSubmit} />
        {this.state.isLoad ? (
          <Loader />
        ) : (
          <Gallery>
            <ImageGalleryItem
              imgArray={this.state.images}
              showModal={this.showModal}
            />
          </Gallery>
        )}

        {this.state.images.length !== 0 ? <Button click={this.loadMore} /> : ''}
        {this.state.images.length === 0 && (
          <span style={{ textAlign: 'center', fontSize: '24px' }}>
            No results
          </span>
        )}
        {this.state.isModalState === true ? (
          <Modal modalImg={this.state.modalImg} clsModal={this.clsModal} />
        ) : (
          ''
        )}
      </div>
    );
  }
}
