import React, { useEffect, useState } from 'react';
import styles from './userModal.module.css';
import { getStorage, ref, listAll, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import {loginSuccess} from '../../../redux/userSlice';
import axios from 'axios';



const UserModal = ({ isModalOpen, closeModal, currentUser }) => {
    // console.log(currentUser);

    const [avatarImageFile, setAvatarImageFile] = useState(null);
    const [avatarImagePreviewUrl, setAvatarImagePreviewUrl] = useState(currentUser.avatar);
    const [coverImageUrls, setCoverImageUrls] = useState([]);
    const [coverImagePreviewUrl, setCoverImagePreviewUrl] = useState(currentUser.cover);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    // Handle avatar image file change
    const handleAvatarImageFileChange = (event) => {
        if (event.target.files[0]) {
            const file = event.target.files[0];
            setAvatarImageFile(file);
            setAvatarImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setAvatarImageFile(null);
            setAvatarImagePreviewUrl(currentUser.avatar); // Reset to original avatar if no file selected
        }
    };

    useEffect(() => {
        const fetchCoverImages = async () => {
            const storage = getStorage();
            const coversFolderRef = ref(storage, 'covers');
            try {
                const result = await listAll(coversFolderRef);
                const urls = await Promise.all(result.items.map((itemRef) => getDownloadURL(itemRef)));
                setCoverImageUrls(urls);
            } catch (error) {
                console.error('Error fetching cover images:', error);
            }
        };
        fetchCoverImages();
    }, []);

    // Handle cover image selection
    const handleCoverImageSelection = (url) => { 
        setCoverImagePreviewUrl(url);
    };
    
    const handleAvatarImageUpload = async () => {
        if (!avatarImageFile) {
            setErrorMsg('Please select an image to upload.');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const storage = getStorage();
        const userFolderRef = ref(storage, `users/${currentUser._id}/avatar`);

        try {
            // Delete existing images
            const existingFiles = await listAll(userFolderRef);
            await Promise.all(existingFiles.items.map(async (fileRef) => {
                await deleteObject(fileRef);
            }));

            // Upload new image
            const newAvatarRef = ref(storage, `users/${currentUser._id}/avatar/${uuidv4()}`);
            const uploadTask = uploadBytesResumable(newAvatarRef, avatarImageFile);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Upload error:', error);
                    alert('Upload failed. Please try again.');
                    setIsUploading(false);
                },
                async () => {
                    const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    setAvatarImagePreviewUrl(downloadUrl);
                    setIsUploading(false);
                    setSuccessMsg('Upload successful!');
                    console.log(downloadUrl);
                }
            );
            setErrorMsg(null);
        } catch (error) {
            console.error('Error:', error);
            setErrorMsg('An error occurred. Please try again.');
            setIsUploading(false);
        }
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            const response = await axios.put(`/api/users/${currentUser._id}`, {
                avatar: avatarImagePreviewUrl,
                cover: coverImagePreviewUrl,
            });

            if (response.status === 200) {
                setSuccessMsg("Profile updated successfully!");
                setTimeout(() => {
                    setSuccessMsg(null);
                    closeModal();
                }, 3000);
                dispatch(loginSuccess(response.data));
            } else {
                setErrorMsg("Failed to update profile.");
                setTimeout(() => {
                    setErrorMsg(null);
                }, 3000);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMsg("Failed to update profile. Please try again.");
            setTimeout(() => {
                setErrorMsg(null);
            }, 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={closeModal}>X</button>
                <h2>Edit Profile</h2>
                <div className={styles.imagePlaceholders}>
                    <div>
                        <h3>Current Avatar:</h3>
                        <img src={avatarImagePreviewUrl} alt="Current Avatar" className={styles.placeholderImage} />
                    </div>
                    <div>
                        <h3>Current Cover:</h3>
                        <img src={coverImagePreviewUrl} alt="Current Cover" className={styles.placeholderImage} />
                    </div>
                </div>
                <h3>Choose a Cover Image:</h3>
                <div className={styles.coverOptions}>
                    {coverImageUrls.map((url) => (
                        <img key={url} src={url} alt="Cover" 
                        className={styles.coverOptionImage} 
                        onClick={() => handleCoverImageSelection(url)}/>
                    ))}
                </div>
                <h3>Upload New Avatar:</h3>
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="file" accept="image/*" onChange={handleAvatarImageFileChange} />
                <button type="button" 
                onClick={handleAvatarImageUpload} 
                disabled={isUploading}
                style={{fontSize: '1.2rem', padding: '0.5rem 1rem', marginLeft: '1rem'}}>
                    Upload Avatar {isUploading && `(${uploadProgress.toFixed(0)}%)`}
                </button>
                </div>
                <button type="button" onClick={handleSaveChanges} disabled={isLoading}> {isLoading ? "Saving..." : "Save"}</button>
            </div>
        </div>
    );
};

export default UserModal;