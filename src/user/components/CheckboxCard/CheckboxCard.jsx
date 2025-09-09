import { Checkbox } from "@chakra-ui/react"
import { useState } from "react"

export const Checkboxs = ({checked, setChecked}) => {
 
  
  return ( 
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(e) => setChecked(!!e.checked)}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label
       fontWeight={'400'}
        fontSize={{base:12,md:14}}
         fontFamily="InterMedium"
         color={'#101928'}
      >This is a free mentoring service</Checkbox.Label>
    </Checkbox.Root>
  )
}
