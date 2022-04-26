import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Container } from './App.styled';
import * as API from 'services/api';
import { mapper } from 'services/mapper';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from 'react';

let totalHits = 0;
let sumHits = 0;
let per_page = 12;

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  // const [per_page, setPer_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const images = await API.getImg(searchQuery, page, per_page);
        const imagesData = mapper(images.hits);
        if (images.hits.length === 0) {
          setIsLoading(false);
          toast.error('There are no images matching your search query');
          return;
        }
        setGallery(prevState => [...prevState, ...imagesData]);
        setIsLoading(false);
        totalHits = images.totalHits;
        sumHits += images.hits.length;
      } catch (error) {
        setIsLoading(false);
        toast.error(`${error}`);
      }
    };
    fetchData();
  }, [searchQuery, page]);

  const onSubmit = queryValue => {
    setGallery([]);
    setIsLoading(false);
    setPage(1);
    setSearchQuery(queryValue);
    sumHits = 0;
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    scrollWindow();
  };

  const scrollWindow = () => {
    scroll.scrollToBottom({
      offset: 100,
      smooth: true,
    });
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const openLargeImage = id => {
    gallery.map(image => {
      if (image.id === id) {
        toggleModal();
        return setLargeImage(image);
      }
      return image;
    });
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && !gallery.length ? (
        <Loader />
      ) : (
        gallery.length > 0 && (
          <ImageGallery gallery={gallery} openLargeImage={openLargeImage} />
        )
      )}
      {isLoading && gallery.length && <Loader />}
      {totalHits !== sumHits && gallery.length > 0 && isLoading === false && (
        <Button loadMore={loadMore} />
      )}
      <ToastContainer />
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
    </Container>
  );
};
