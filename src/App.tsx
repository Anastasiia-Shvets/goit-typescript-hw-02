import './App.css'
import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar'
import { getGallery } from './API/apiServer';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

export interface Image {
  id: string;
  urls: { small: string, regular: string };
  alt_description: string;
}

interface Results {
  results: Image[];
  total_pages: number;
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [urls, setUrls] = useState<string>('');
  const [alt, setAlt] = useState<string>('');

  useEffect(() => {
    if (!query) return;
    const fatchData = async () => {
      setIsLoading(true)
      try {
        const { results, total_pages }: Results = await getGallery(query, page)
        if (!results.length) {
          setIsEmpty(true);
          return;
        }
        setImages((prevImages) => [...prevImages, ...results]);
        setShowBtn(page > total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false)
      }
    };
    fatchData()
  }, [query, page])


  const onHandleSubmit = (value: string): void => {
    if (!value.trim()) {
      notify('Please enter a search value.');
      return;
    }
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(false);
    setShowBtn(false);
  };

  const onLoadeMore = (): void => {
    setPage((prevPage )=> prevPage + 1)
  }

  const openModal = (obj: Image): void => {
    setShowModal(true);
    setAlt(obj.alt_description);
    setUrls(obj.urls.regular);
  }

  const closeModal = (): void => {
    setShowModal(false);
    setAlt('');
    setUrls('');
  }

  const notify = (message: string): JSX.Element => <ErrorMessage message={message} />;

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {images.length > 0 && <ImageGallery images={images} openModal={openModal} />}
      {isLoading && <Loader />}
      {error && notify('Sorry. Something went wrong.')}
      {isEmpty && notify('Sorry. There are no images...')}
      {showBtn && <LoadMoreBtn onLoadeMore={onLoadeMore} disabled={isLoading} />}
      <ImageModal urls={urls} alt={alt}
        modalIsOpen={showModal}
        closeModal={closeModal} />


      <Toaster position='top-center' />
    </>
  )
}

export default App
