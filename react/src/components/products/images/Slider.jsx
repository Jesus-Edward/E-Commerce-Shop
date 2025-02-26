import React, { useEffect, useState } from 'react';
import ImageGallery from "react-image-gallery";

export default function Slider({product}) {

    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        handleProductImages();
    }, [])

    const handleProductImages = () => {
        let updatedImages = [
            {
                original: product?.thumbnail,
                thumbnail: product?.thumbnail,
                sizes: 300
            },
        ];

        if (product?.first_image) {
            updatedImages = [
                ...updatedImages,
                {
                    original: product?.first_image,
                    thumbnail: product?.first_image,
                    sizes: 300,
                },
            ];
        } else if (product?.second_image) {
            updatedImages = [
                ...updatedImages,
                {
                    original: product?.second_image,
                    thumbnail: product?.second_image,
                    sizes: 300,
                },
            ];
        } else if (product?.third_image) {
            updatedImages = [
                ...updatedImages,
                {
                    original: product?.third_image,
                    thumbnail: product?.third_image,
                    sizes: 300,
                },
            ];
        }

        setImages(updatedImages);
        setLoaded(true);
    }
    return <ImageGallery
        showPlayButton={loaded}
        showFullscreenButton={loaded}
        items={images} />
}
