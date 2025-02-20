import { Modal, Typography } from 'antd';
import { useState } from 'react';
import { WhatsappIcon } from './icons';

type Props = {
    sharedMkekaText: string,
    isVisible: boolean
    closeModal: () => void
    messageHeader: string
}

const {Paragraph, Text } = Typography

export const MkekaModal = ({sharedMkekaText, messageHeader, isVisible, closeModal} : Props) => {
    const [expanded, setExpanded] = useState(false);
    const [rows, setRows] = useState(15);
    const message = `${messageHeader} ${sharedMkekaText}`
    const encodedMessage = encodeURIComponent(message); 
    const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
    
    return (
        <Modal
            title={
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Text style={{fontSize: '1rem'}}>Share Mkeka</Text> 
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{marginRight: "3rem"}}>
                        <WhatsappIcon/>
                    </a>
                </div>      
            }
            open={isVisible}
            onCancel={closeModal}
            footer={false}
        >         
            <Typography.Paragraph
                copyable
                ellipsis={{
                rows,
                expandable: 'collapsible',
                expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
                }}
                style={{
                    whiteSpace: 'pre-line', // Mimics the behavior of <pre> but allows text wrapping
                  }}
            >
                {messageHeader}
                {sharedMkekaText}
            </Typography.Paragraph>             
        </Modal>
        
    )
}