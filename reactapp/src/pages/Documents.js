import React, { useState, useEffect } from "react";
import { Accordion, AccordionItem, AccordionHeader, Button, Collapse, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import NavBarMain from "../components/NavBarMain"
import '../App.css'






function Documents() {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("")
    var documentsTitle = ["Bail", "Quittances", "Etat des lieux", "Régularisation des charges", "Révison du loyer"]
    const [documentsByType, setDocumentsByType] = useState([])
    const [isVisible, setIsVisible] = useState(false)



    //Lecture BDD à l'initialisation du composant
    useEffect(() => {
        const findDocuments = async () => {
            const data = await fetch('/document')
            const body = await data.json()
            setDocumentsByType(body)
            //console.log(body)
        }
        findDocuments()
    }, [documentsByType])


    const addDocument = async (x) => {
        var date = Date.now()
            const addDoc = await fetch('/document-add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `type=${x}&url=http://test.fr&date=${date}`
            })
            console.log(addDoc)
        }

    //Fonction ajouter un document dans BDD avec modale
    const handleClick = () => {
        setIsVisible(true)
        addDocument()
        
    }
    



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


                <div>
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
                                                    <p>{doctype.url}</p>
                                                )
                                            }

                                        })}
                                        <Button onClick={() => {handleClick(); addDocument(i)}} style={{ margin: "10px" }}> + Ajouter un document</Button>
                                    </AccordionItem>
                                </Collapse>
                            </AccordionItem>
                        </Accordion>

                    ))}
                    <Modal
                        toggle={function noRefCheck() { }}
                        isOpen={isVisible}
                    >
                        <ModalHeader toggle={function noRefCheck() { }}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={function noRefCheck() { }}
                            >
                                Do Something
                            </Button>
                            {' '}
                            <Button onClick={function noRefCheck() { }}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        </div>

    )

}

export default Documents;


