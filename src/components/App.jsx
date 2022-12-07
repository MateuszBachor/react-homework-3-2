import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Gallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import Button from './Button/Button';
// import fetchImage from './Services/fetchImage';      Error GitHub
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import axios from 'axios';

export class App extends React.Component {
  state = {
    query: '',
    page: 1,
    images: [],
    helpState: true,
    modalImg: '',
    isLoad: false,
  };
  fetchImage = async (query, page) => {
    const baseUrl = 'https://pixabay.com/api';
    try {
      const response = await axios.get(
        `${baseUrl}?key=28406091-8008b7c1afae3beb3d4e940a7&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12}`
      );
      return response.data;
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  componentDidMount() {
    this.renderGallery();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
      this.renderGallery();
    }
  }

  async renderGallery() {
    const response = await this.fetchImage(this.state.query, this.state.page);
    this.falseLoad();

    if (this.state.page === 1) {
      this.setState({ images: response.hits });
    }
    if (this.state.page > 1) {
      this.setState({ images: [...this.state.images, ...response.hits] });
    }
  }
  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const query = form.elements.query.value;
    this.setState({ query: query });
    this.setState({ page: 1 });

    form.reset();
    this.trueLoad();
  };

  loadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };
  showModal = e => {
    this.setState({ modalImg: e.target.dataset.source });
    this.setState({ isModalState: true });
  };
  clsModal = () => {
    this.setState({
      isModalState: false,
    });
  };
  trueLoad = () => {
    this.setState({ isLoad: true });
  };
  falseLoad = () => {
    this.setState({ isLoad: false });
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

        {this.state.images.length !== 0 && this.state.isLoad === false ? (
          <Button click={this.loadMore} />
        ) : (
          ''
        )}
        {this.state.images.length === 0 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://webmarketingschool.com/wp-content/uploads/2018/03/nojobsfound.png"
              alt=""
            />
          </div>
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
