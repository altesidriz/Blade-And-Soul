import { useEffect, useState, useRef } from 'react';
import styles from './profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { loginSuccess } from '../../redux/userSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { IoMdTime } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { format } from 'timeago.js';
import UserModal from './userModal/UserModal';
import UserCarousel from './userCarousel/UserCarousel';
import Dialog from '../../components/dialog/Dialog';
import { IoMdCloseCircle } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const { name, role, avatar, pictures, createdAt, cover, _id } = currentUser;
    const params = useParams();
    const isOwner = params.id === currentUser._id;
    const [active, setActive] = useState(0);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carouselOpen, setCarouselOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [originalButtonText, setOriginalButtonText] = useState("Add More Images");
    const [hoveredImage, setHoveredImage] = useState(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const storage = getStorage();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts/users/${currentUser._id}`);
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, [currentUser._id]);

    const handleClick = (index) => {
        setActive(index);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openCarousel = () => {
        setCarouselOpen(true);
    };

    const closeCarousel = () => {
        setCarouselOpen(false);
    };

    const handleFileUpload = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setIsUploading(true);
            setOriginalButtonText(fileInputRef.current.parentElement.querySelector('button').textContent);
            const uploadPromises = [];
            const imageUrls = [];
            let completedUploads = 0;

            for (const file of files) {
                const imageRef = ref(storage, `users/${_id}/images/${uuidv4()}`);
                const uploadTask = uploadBytesResumable(imageRef, file);

                uploadPromises.push(
                    new Promise((resolve, reject) => {
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                const totalProgress = (completedUploads + progress / 100) / files.length * 100;
                                fileInputRef.current.parentElement.querySelector('button').textContent = `Uploading... ${totalProgress.toFixed(2)}%`;
                            },
                            (error) => {
                                console.error('Upload error:', error);
                                reject(error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                imageUrls.push(downloadURL);
                                completedUploads++;
                                if (completedUploads === files.length) {
                                  fileInputRef.current.parentElement.querySelector('button').textContent = originalButtonText;
                                }
                                resolve();
                            }
                        );
                    })
                );
            }

            try {
                await Promise.all(uploadPromises);
                const response = await axios.put(`/api/users/${_id}/pictures`, { pictures: imageUrls });
                dispatch(loginSuccess({ ...currentUser, pictures: [...currentUser.pictures, ...imageUrls] }));
                setIsUploading(false);
            } catch (error) {
                console.error('Error uploading images:', error);
                setIsUploading(false);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleDeleteClick = (imageUrl) => {
        setImageToDelete(imageUrl);
        setDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
           
            const imageRef = ref(storage, imageToDelete);
            await deleteObject(imageRef);

            
            await axios.delete(`/api/users/${_id}/pictures`, { data: { picture: imageToDelete } });
            const updatedPictures = currentUser.pictures.filter(pic => pic !== imageToDelete);
            dispatch(loginSuccess({ ...currentUser, pictures: updatedPictures }));

        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    // const handleDeleteImage = async (imageUrl) => {
    //     if (window.confirm("Are you sure you want to delete this image?")) {
    //         try {
    //             // Delete from Firebase Storage (client-side)
    //             const imageRef = ref(storage, imageUrl);
    //             await deleteObject(imageRef);
    
    //             // Delete from backend database
    //             await axios.delete(`/api/users/${_id}/pictures`, { data: { picture: imageUrl } });
    //             const updatedPictures = currentUser.pictures.filter(pic => pic !== imageUrl);
    //             dispatch(loginSuccess({ ...currentUser, pictures: updatedPictures }));
    
    //             alert("Image deleted successfully.");
    //         } catch (error) {
    //             console.error("Error deleting image:", error);
    //             alert("Failed to delete image.");
    //         }
    //     }
    // };

    return (
        <div className={styles.container}>
            <div className={styles.cover}>
                <div className={styles.top}>
                    {isOwner && <LiaEditSolid size={25} className={styles.editBtn} onClick={openModal} />}
                    <img src={cover} alt="" />
                    <div className={styles.playerInfo}>
                        <h1>{name}</h1>
                        <h5>{role}</h5>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.profileImg}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={styles.joined}>
                        <span>JOINED</span>
                        <span>{format(createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.playerContent}>
                <div className={styles.tabsContainer}>
                    <div onClick={() => handleClick(0)} className={active === 0 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}>Images</div>
                    <div onClick={() => handleClick(1)} className={active === 1 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}>Posts</div>
                </div>
                <div className={styles.tabsContent}>
                    <div className={active === 0 ? `${styles.imageContent} ${styles.activeContent}` : `${styles.imageContent}`}>
                        <button className={styles.addMoreBtn} onClick={triggerFileInput}>Add More Images</button>
                        <input type="file" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
                        <div className={styles.galery}>
                        {pictures?.map((pic) => (
                                <div
                                    key={pic}
                                    className={styles.imageContainer}
                                    onMouseEnter={() => setHoveredImage(pic)}
                                    onMouseLeave={() => setHoveredImage(null)}
                                >
                                    <img src={pic} alt="" onClick={openCarousel} />
                                    {hoveredImage === pic && (
                                        <button className={styles.deleteButton} onClick={() => handleDeleteClick(pic)}>
                                            <MdDeleteForever size={25}/>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={active === 1 ? `${styles.postContent} ${styles.activeContent}` : `${styles.postContent}`}>
                        {posts.map((post) => (
                            <div key={post._id} className={styles.post}>
                                <div className={styles.postAvatar}>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className={styles.postInfo}>
                                    <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
                                    <span><IoMdTime size={15} />{format(post.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {isModalOpen && <UserModal isModalOpen={isModalOpen} closeModal={closeModal} currentUser={currentUser} />}
            {carouselOpen && (<UserCarousel pictures={pictures} onClose={closeCarousel} />)}
            <Dialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this image?" />
        </div>
    );
};

export default Profile;