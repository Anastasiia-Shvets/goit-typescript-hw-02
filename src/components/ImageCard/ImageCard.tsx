import style from './ImageCard.module.css';
import { Image } from '../../App';

type Props = {
    image: Image;
    openModal: (image: Image) => void;
}

const ImageCard = ({ image, openModal }: Props) => {
    return (
        <li className={style.item}>
            <div>
                <img src={image.urls.small}
                    alt={image.alt_description}
                    onClick={() => openModal(image)} />
            </div>
        </li>
    )
}
export default ImageCard