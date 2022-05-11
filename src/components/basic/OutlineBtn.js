import React from 'react';
import { Button } from '@chakra-ui/react'

export default function OutlineBtn(props) {
    return (
        <Button
            {...props}
            bg="transparent"
            color={props.colorArr[0]}
            border={"1px solid"}
            borderColor={props.colorArr[0]}
            _hover={{
                backgroundColor: props.colorArr[0],
                color: props.colorArr[1]
            }}
            _focus={{ outline: "none" }}
            _active={{}}
        >
            {props.children}
        </Button>
    );
}
