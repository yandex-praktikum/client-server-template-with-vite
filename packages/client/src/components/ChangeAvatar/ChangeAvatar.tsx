import { Button, Form, Modal, Upload } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import Avatar from "../Avatar/Avatar";
import { baseApiUrl } from "@/api/api";
import { DEFAULT_AVATAR } from "@/utils/constants";
import { putUserAvatar } from "@/api/user";
import { useForm } from "antd/es/form/Form";

type ChangeAvatarProps = {
    avatar: string;
    isOpen: boolean;
    onCancel?: ()=>void;    
    onOk: ()=>void;

}

export const ChangeAvatar:FC<ChangeAvatarProps> = (props: ChangeAvatarProps) => {
    const resourcesUrl = baseApiUrl + 'resources'; 
    const [avatarForm] = useForm();
    const [imageSource, setImageSource] = useState('');
    useEffect(()=>{
        if (props.avatar) {
        setImageSource(resourcesUrl + props.avatar);
        }
        else setImageSource(DEFAULT_AVATAR);
    },[])
;    const [file, setFile] = useState<File>();
    const beforeUpload = useCallback((newFile: File)=>{
        setFile(newFile);
        setImageSource(URL.createObjectURL(newFile));
        return false;
    },[]);

    const uploadNewAvatar = useCallback(()=> {
        if (file) {
          const request = new FormData();
          request.append('avatar', file);
          putUserAvatar(request).then(
            x=> {
              console.log(x);
              setImageSource(resourcesUrl + x.avatar);
            }
          )
        }
      }, [file]);

    return (
        <Modal open={props.isOpen} onCancel={props.onCancel} onOk={async () => {await avatarForm.submit();props.onOk();}}>
            <Form onFinish={uploadNewAvatar} form={avatarForm}>       
            <Avatar size='md' img={imageSource}></Avatar>
            <Form.Item>
            <Upload accept='image/*' beforeUpload={beforeUpload} >
                <Button>Click to upload</Button>
            </Upload>
            </Form.Item>
            </Form>
        </Modal>)
}
