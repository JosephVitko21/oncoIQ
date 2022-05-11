import React from 'react';
import { Button } from '@chakra-ui/react';

export default function Btn(props) {
    return (
        <Button
            {...props}
            bg={props.colorArr[1]}
            color={props.colorArr[0]}
            border={null}
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
