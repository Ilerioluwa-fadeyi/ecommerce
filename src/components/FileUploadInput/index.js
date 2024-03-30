import { useState } from "react";
import { storage } from '../../config/firebase';
import 'react-circular-progressbar/dist/styles.css';
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "firebase/storage";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";


const FileUploadInput = (props) => {
    const {File,setFile,name,handleChange,location,label,progresspercent,setProgresspercent} = props;
    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const storageRef = ref(storage, `${location ? location : 'files'}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setFile(file);

        uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                handleChange((prevState) => {return {...prevState,imageFile: downloadURL}})
            });
        }
        );
    }
    return ( 
        <fieldset className="flex cursor-pointer relative mb-5 z-0">
            <p className="w-60 text-left my-auto">{label}</p>
            <input className="absolute opacity-0 w-full h-full z-50 cursor-pointer rounded-lrg" type="file" onChange={(e) => handleUpload(e)} accept=".jpg, .jpeg, .png" name={name}/>
            <label className="w-full flex z-0 gap-2 rounded-md border border-gray-300 hover:border-primary p-3">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" class="w-6 h-6 mt-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                </svg>
                <p className="text-18 leading-25 text-subtle">{File?.name ? File.name : "Select an image"}</p>
                {progresspercent === 0 ? null : (
                    <div className="ml-auto w-8 h-7">
                        <CircularProgressbar
                            value={progresspercent}
                            text={`${progresspercent}%`}
                            styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                        
                            // Text size
                            textSize: '20px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                        
                            // Colors
                            pathColor: `rgba(224,26,132, ${progresspercent / 100})`,
                            textColor: '#FFFFFF',
                            trailColor: '#FFFFFF',
                            backgroundColor: '#FFFFFF',
                            })}
                        />
                    </div>

                )}
            </label>
        </fieldset>
     );
}
 
export default FileUploadInput;