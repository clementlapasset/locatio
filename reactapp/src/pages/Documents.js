import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionHeader } from 'reactstrap';





function Documents() {
    
    const [open, setOpen] = useState(false);


    return (
        <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <h1>Créez ou consultez vos document</h1>
            <Accordion
                open="1"
                toggle={function noRefCheck() { }}
            >
                <AccordionItem style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <AccordionHeader targetId="1" data-bs-toggle="collapse">
                        Bail
                    </AccordionHeader>
                    <AccordionItem accordionId="1">
                        <strong>
                            This is the first item's accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                        <code>
                            .accordion-body
                        </code>
                        , though the transition does limit overflow.
                    </AccordionItem>
                </AccordionItem>
                <AccordionItem style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <AccordionHeader targetId="2">
                        Etat des lieux
                    </AccordionHeader>
                    <AccordionItem accordionId="2">
                        <strong>
                            This is the second item's accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                        <code>
                            .accordion-body
                        </code>
                        , though the transition does limit overflow.
                    </AccordionItem>
                </AccordionItem>
                <AccordionItem style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <AccordionHeader targetId="3">
                        Quittances
                    </AccordionHeader>
                    <AccordionItem accordionId="3">
                        <strong>
                            This is the third item's accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                        <code>
                            .accordion-body
                        </code>
                        , though the transition does limit overflow.
                    </AccordionItem>
                </AccordionItem>
                <AccordionItem style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <AccordionHeader targetId="4">
                        Régularisation des charges
                    </AccordionHeader>
                    <AccordionItem accordionId="4">
                        <strong>
                            This is the first item's accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                        <code>
                            .accordion-body
                        </code>
                        , though the transition does limit overflow.
                    </AccordionItem>
                </AccordionItem>
                <AccordionItem style={{display:"flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                    <AccordionHeader targetId="5">
                        Révision de loyer
                    </AccordionHeader>
                    <AccordionItem accordionId="5">
                        <strong>
                            This is the first item's accordion body.
                        </strong>
                        You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the{' '}
                        <code>
                            .accordion-body
                        </code>
                        , though the transition does limit overflow.
                    </AccordionItem>
                </AccordionItem>
            </Accordion>
        </div>


    )

}

export default Documents;


