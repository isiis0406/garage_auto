import AdminLayout from '../../../components/admin/adminLayout/AdminLayout.js';
import ReusableTable from '../../../components/table/ReusableTable.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectIsLoggedInd } from '../../../redux/features/auth/authSlice.js';
import useRedirectLoggedOutUser from '../../../customHook/useRedirectLoggedOutUser.js';
import Loader from '../../../components/loader/loader.js';
import { useNavigate } from 'react-router-dom';
import { archiveMessage, deleteMessage, getMessages } from '../../../redux/features/messages/messageSlice.js';
const Messages = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(selectIsLoggedInd);
    // Récupérer les états globaux depuis le redux
    const { messages, isLoading, isError, message } = useSelector((state) => state.messages);
    
    const handleView = async (id) => {
        await navigate(`/admin/message-detail/${id}`)
    };
    const handleArchive = async (id) => {
        const result = await dispatch(archiveMessage(id));
        if(!result.error){
            await dispatch(getMessages());
            navigate('/admin/messages');
        }
    };
    const handleDeleteMessage = async (id) => {   
        
       const result = await dispatch(deleteMessage(id));
        if(!result.error){
            await dispatch(getMessages());
            navigate('/admin/messages');
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getMessages());
            if (isError) {
                console.log(message);
            }
        }
    }, [isError, message, dispatch, isLoggedIn]);


    const columns = [
        { header: 'Nom', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Téléphone', accessor: 'phone' },
        { header: 'Message', accessor: 'message' },
        { header: 'Archivé', accessor: 'archived' },
    ];

    return (
        <>
            {isLoading && <Loader />}
            {messages &&
                <AdminLayout title="Méssagerie">
                    <ReusableTable 
                    columns={columns} 
                    data={messages} 
                    handleView={handleView}
                    handleArchive={handleArchive}
                    handleDelete={handleDeleteMessage}
                    />
                </AdminLayout>}
        </>
    );
};

export default Messages;


