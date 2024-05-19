import ImageCard from "../ImageCard/ImageCard";
import style from './ImageGallery.module.css';
import { Image } from '../../App';
type Props = {
    images: Image[];
    openModal: (image: Image) => void;
}

const ImageGallery = ({ images, openModal }: Props) => {
    return (
        <ul className={style.list}>
            {images.map(( image ) => (
                <ImageCard key={image.id} image={image} openModal={openModal} />
            ))}
        </ul>
    )
}
export default ImageGallery