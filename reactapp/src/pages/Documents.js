import React from "react";


export default function Documents() {

    return (
        <View>
            <div className="d-flex justify-content-center p-5">
                <Dropdown toggle={function noRefCheck() { }}>
                    <DropdownToggle caret>
                        Dropdown
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem header>
                            Header
                        </DropdownItem>
                        <DropdownItem>
                            Some Action
                        </DropdownItem>
                        <DropdownItem text>
                            Dropdown Item Text
                        </DropdownItem>
                        <DropdownItem disabled>
                            Action (disabled)
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                            Foo Action
                        </DropdownItem>
                        <DropdownItem>
                            Bar Action
                        </DropdownItem>
                        <DropdownItem>
                            Quo Action
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </View>
    )

}


