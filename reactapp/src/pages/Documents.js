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



    //Lecture BDD à l'initialisation du composant
    useEffect(() => {
        const findDocuments = async () => {
            const data = await fetch('/document')
            const body = await data.json()
            setDocumentsByType([...documentsByType, body])
            // console.log(body)
        }
        findDocuments()
    }, [documentsByType])



    const addDocument = async () => {
        var date = Date.now()
        await fetch('/document-add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `type=${indice}&url=http://test.fr&date=${date}&title=${title}`
        })
    }



    const modalClick = () => {
        addDocument()
        setIsVisible(false)
        console.log(file)
    }

    
    const handleChange = file => {
        setFile(file);
    };




    // Gestion ouverture-fermeture des <Accordion>
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


                <h1 style={{ marginTop: "50px", marginBottom: "50px" }}>Créez ou consultez vos document</h1>


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
                                                    <p style={{ marginTop: "5px", marginBottom: "5px" }}>{doctype.title}</p>
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
                                <p style={{margin:"auto"}}>Cliquez ou glissez le fichier à mettre en ligne</p>
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


