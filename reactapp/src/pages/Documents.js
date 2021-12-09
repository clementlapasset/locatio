import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionHeader, Button, Collapse, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';
import NavBarMain from "../components/NavBarMain"
import { FileUploader } from "react-drag-drop-files";
import '../App.css'


function Documents() {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("")
    var documentsTitle = ["Bail", "Quittances", "Etat des lieux", "Régularisation des charges", "Révison du loyer"]
    const [documentsByType, setDocumentsByType] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [indice, setIndice] = useState("")
    const [title, setTitle] = useState("")
    const fileTypes = ["PDF"];
    const [file, setFile] = useState(null);




    // ------------------- Lecture base de données a l'initialisation du composant ------------------- \\
    useEffect(() => {
        const findDocuments = async () => {
            const data = await fetch('/document')
            const body = await data.json()
            setDocumentsByType(body)
            // console.log(body)
        }
        findDocuments()
    }, [])

    // ------------------- Upload d'un document sur serveur distant (backend)------------------- \\
    const modalClick = () => {
        var date = Date.now()
        setIsVisible(false)
        const formData = new FormData();
        formData.append("document", file);
        formData.append("type", indice)
        formData.append("date", date)
        formData.append("title", title)
        fetch("/upload-file", {
            method: "POST",
            body: formData,
        })
        console.log(file)
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


                <h1 style={{ marginTop: "50px", marginBottom: "50px" }}>Créez ou consultez vos documents</h1>


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
                                                    <div style={{ borderBottom: "solid", borderBottomWidth: "1px", borderBottomColor: "#ced4da", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <p onClick={() => downloadDoc(doctype._id)} style={{ marginTop: "5px", marginBottom: "5px", cursor: "pointer" }}>- {doctype.title} -</p>
                                                    </div>
                                                )
                                            }


                                        })}
                                        <Button onClick={() => { setIsVisible(true); setIndice(i) }} style={{ margin: "10px" }}> + Ajouter un document</Button>
                                    </AccordionItem>
                                </Collapse>
                            </AccordionItem>
                        </Accordion>

                    ))}
                    <Modal
                        isOpen={isVisible}
                    >
                        <ModalHeader toggle={function noRefCheck() { }}>
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


                                {/* <p>{file.name}</p> */}

                            </FileUploader>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() => modalClick()}

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

export default Documents;


