import React, { useState } from 'react';
import { Card, Avatar, Button, Modal } from 'antd';
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';


const { Meta } = Card;

const TeamProfile = ({ user, onDeactivate, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeactivateClick = () => {
    onDeactivate(user);
    handleOk();
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${user.name}'s account?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(user);
        handleOk();
      }
    });
  };

  return (
    <>
      <Card
        style={{ width: 240, margin: 5 }}
        actions={[
          <Button type="primary" onClick={showModal}>View Profile</Button>
        ]}
      >
        <Meta
          className='d-flex justify-content-center'
          avatar={<Avatar icon={<UserOutlined />} src={user.profilePicture} />}
          title={user.name}
          description={`Role: ${user.role}`}
        />
        <p className='d-flex justify-content-center'>Status: {user.status}</p>
      </Card>

      <Modal
        title={`${user.name}'s Profile`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <>
            {
              user.active ?
                <Button key="deactivate" type="primary" danger onClick={handleDeactivateClick}>
                  Deactivate
                </Button> : <Button key="activate" type="primary" onClick={handleDeactivateClick}>
                  Activate
                </Button>
            }
          </>,
          <Button key="delete" type="primary" danger onClick={handleDeleteClick}>
            Delete
          </Button>,
          <Button key="close" onClick={handleOk}>
            Close
          </Button>
        ]}
      >
        <div>
          <Avatar size={64} icon={<UserOutlined />} src={user.profilePicture} />
          <h3>{user.name}</h3>
          <p>Role: {user.role}</p>
          <p>Status: {user.status}</p>
          {/* Add more user details if needed */}
        </div>
      </Modal>
    </>
  );
};



export default TeamProfile;
