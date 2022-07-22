import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadActions';
import { updateUser } from '../../actions/userActions';

function ProfileModal({modalOpened,setModalOpened,data}) {
    const theme = useMantineTheme();

    const {password,...other}=data;
    const [formData,setFormData] = useState(other);
    const [profileImage,setProfileImage] = useState(null)
    const [coverImage,setCoverImage] = useState(null)
    const dispatch = useDispatch()
    const param = useParams()
    const {user} = useSelector((state)=>state.authReducer.authData)

    const inputEvent = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const imageChange = (e)=>{
        if(e.target.files && e.target.files[0]){
            let img = e.target.files[0];
            e.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
        }
    };

    const userUpedation = (e)=>{
        e.preventDefault();
        let UserData = formData;
        if(profileImage){
            const data = new FormData();
            const filename = Date.now() + profileImage.name;
            data.append("name",filename);
            data.append("file",profileImage);
            UserData.profilePicture = filename;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }

        if(coverImage){
            const data = new FormData();
            const filename = Date.now() + coverImage.name;
            data.append("name",filename);
            data.append("file",coverImage);
            UserData.coverPicture = filename;
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(updateUser(param.id,UserData));
        setModalOpened(false);
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened = {modalOpened}
            onClose = {()=>setModalOpened(false)}
        >
            <form className='infoForm'>
                <h3>Your info</h3>
                <div>
                    <input type="text" className='infoInput' name='firstname' placeholder='First Name' value={formData.firstname} onChange={inputEvent}/>
                    <input type="text" className='infoInput' name='lastname' placeholder='Last Name' value={formData.lastname} onChange={inputEvent} />
                </div>
                <div>
                    <input type="text" className='infoInput' name='worksAt' placeholder='Works at' value={formData.worksAt} onChange={inputEvent} />
                </div>
                <div>
                    <input type="text" className='infoInput' name='livesin' placeholder='Lives in' value={formData.livesin} onChange={inputEvent} />
                    <input type="text" className='infoInput' name='country' placeholder='Country' value={formData.country} onChange={inputEvent} />
                </div>
                <div>
                    <input type="text" className='infoInput' name="status" placeholder='Status' value={formData.status} onChange={inputEvent} />
                </div>
                <div>
                    Profile Pic
                    <input type='file' name='profileImage'onChange={imageChange}/>
                    Cover Image
                    <input type='file' name='coverImage' onChange={imageChange}/>
                </div>
                <button className='button infoButton' onClick={userUpedation}>Update</button>
            </form>
        </Modal>
    );
}

export default ProfileModal;