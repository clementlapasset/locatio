import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader, Collapse } from 'reactstrap';
import '../App.css'






function Documents() {

    const [isOpen, setIsOpen] = useState(false);
    const [isSelected, setIsSelected] = useState("")
    var documents = ["Bail n°1", "Quittance n°1", "Etat des lieux", "Régularisation des charges"]
    

    const setAcc = (x) => {
       
        if (isOpen === x) {
            setIsOpen("");
          } else {
            setIsOpen(x);
          }
        if (isSelected === x){
            setIsSelected("")
        } else {
            setIsSelected(x)
        }
        
        console.log(x)
    }

    return (
        
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            
            <h1>Créez ou consultez vos document</h1>

            
                <div>
                {documents.map((document, i) => (
                    <Accordion open={isSelected} toggle={function noRefCheck() { }}>
                    
                        <AccordionItem onClick={() => setAcc(i)} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "80vw", height:"52px",backgroundColor:"#00C689", color:"white", marginBottom:"10px" }}>
                            {/* <AccordionHeader targetId={i} style={{width:"50%", backgroundColor:"red"}}> */}
                                {document}
                            {/* </AccordionHeader > */}
                            <Collapse isOpen={isOpen === i}>
                                <AccordionItem accordionId={i} >
                                    + Ajouter un document
                                </AccordionItem>
                            </Collapse>
                        </AccordionItem>
                        
                    </Accordion>
                    ))}
                </div>
            

        </div>


    )

}

export default Documents;


