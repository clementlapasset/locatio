import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionHeader, Button, Collapse, Modal, ModalBody, ModalHeader, ModalFooter, Input, Alert } from 'reactstrap';
import NavBarMain from "../components/NavBarMain"
import { FileUploader } from "react-drag-drop-files";
import '../App.css'
import { FaTrashAlt } from 'react-icons/fa';
import { connect } from 'react-redux'



function Documents(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("")
    var documentsTitle = ["Bail", "Quittances", "Etat des lieux", "Régularisation des charges", "Révison du loyer"]
    const [documentsByType, setDocumentsByType] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [indice, setIndice] = useState("")
    const [title, setTitle] = useState("")
    const fileTypes = ["PDF"];
    const [file, setFile] = useState(null);
    const [reloadComponent, setReloadComponent] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState("")



    // ------------------- Lecture base de données a l'initialisation du composant ------------------- \\
    useEffect(() => {
        const findDocuments = async () => {
            const data = await fetch(`/document/${props.token}`)
            const body = await data.json()
            setDocumentsByType(body)
            console.log(body)
        }
        findDocuments()
    }, [reloadComponent])

    // ------------------- Suppression d'un document ------------------- \\
    const deleteDoc = async (idDoc) => {
        const deleteDocument = await fetch('/delete-file', {
            method: "DELETE",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `docId=${idDoc}`
        })
        var response = await deleteDocument.json()
        console.log(response.result)

        if(response.result){
            setDeleteStatus(<Alert>Suppression effectuée !</Alert>)
        }

        setReloadComponent(deleteDocument)  
    }

    // ------------------- Upload d'un document sur serveur distant (backend)------------------- \\
    const modalClick = async () => {
        var date = Date.now()
        setIsVisible(false)
        console.log(props.token)
        const formData = new FormData();
        formData.append("document", file)
        formData.append("type", indice)
        formData.append("date", date)
        formData.append("title", title)
        formData.append("token", props.token)
        const response = await fetch("/upload-file", {
            method: "POST",
            body: formData,
        })
        console.log(file)
        setReloadComponent(response)
    }

    // ------------------- Gestion upload area ------------------- \\
    const handleChange = file => {
        setFile(file);
    };

    // ------------------- Téléchargement d'un document via serveur distant (backend) ------------------- \\
    const downloadDoc = async (idDoc) => {
        console.log(idDoc)
        await fetch('/download-file', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `docId=${idDoc}`
        })

        await fetch("/download-file")
            .then(response => response.blob())
            .then(blob => {
                window.open(URL.createObjectURL(blob));
            })
            .catch(error => console.log('error', error));
    }


    // ------------------- Gestion ouverture-fermeture des <Accordion> ------------------- \\
    const setAcc = (x) => {

        if (isOpen === x) {
            setIsOpen("");
        } else {
            setIsOpen(x);
        }
        if (isSelected === x) {
            setIsSelected("")
        } else {
            setIsSelected(x)
        }
    }

    return (

        <div>
            <NavBarMain />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{width: "100%"}}>
                {deleteStatus}
                </div>
                


                <h1 style={{ marginTop: "50px", marginBottom: "50px" }}>Mettez en ligne ou consultez vos documents</h1>


                <div style={{ margin: "auto" }}>
                    {documentsTitle.map((document, i) => (
                        <Accordion style={{ width: "1000px", marginBottom: "30px" }} open={isSelected} toggle={function noRefCheck() { }}>

                            <AccordionItem onClick={() => setAcc(i)} >
                                <AccordionHeader targetId={i} style={{ width: "100%" }}>
                                    {document}
                                </AccordionHeader >
                                <Collapse isOpen={isOpen === i}>
                                    <AccordionItem accordionId={i} style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                                        {/* eslint-disable-next-line */}
                                        {documentsByType.map((doctype) => {


                                            if (parseInt(doctype.type) === i) {

                                                return (
                                                    <div  style={{ borderBottom: "solid", borderBottomWidth: "1px", borderBottomColor: "#ced4da", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <p></p>
                                                        <p className="accordionswagg" onClick={() => downloadDoc(doctype._id)} style={{ marginTop: "5px", marginBottom: "5px", cursor: "pointer" }}>- {doctype.title} -</p>
                                                        <FaTrashAlt className="trash" onClick={() => deleteDoc(doctype._id)} style={{marginRight: "5px", cursor: "pointer"}}></FaTrashAlt>
                                                    </div>
                                                )
                                            }


                                        })}
                                        <Button onClick={() => { setIsVisible(true); setIndice(i) }} style={{ margin: "10px", backgroundColor: "#2A327D" }}> + Ajouter un document</Button>
                                    </AccordionItem>
                                </Collapse>
                            </AccordionItem>
                        </Accordion>

                    ))}
                    <Modal
                        isOpen={isVisible}
                    >
                        <ModalHeader >
                            Ajouter un document
                        </ModalHeader>
                        <ModalBody>
                            <Input onChange={(e) => setTitle(e.target.value)} placeholder="Titre du document"
                            />
                            <FileUploader
                                handleChange={handleChange}
                                name="file"
                                types={fileTypes}
                                children
                            >
                                <p style={{ margin: "auto" }}>Cliquez ou glissez le fichier à mettre en ligne (.pdf)</p>

                            </FileUploader>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="buttonModal"
                                color="primary"
                                onClick={() => modalClick()}
                                style={{backgroundColor: "#00C689", border: "none"}}
                            >
                                Valider
                            </Button>
                            {' '}
                            <Button onClick={() => setIsVisible(false)}>
                                Annuler
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        </div>

    )

}

function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(Documents);



