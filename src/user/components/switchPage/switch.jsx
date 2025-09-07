
import { Switch } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRequest } from "../../../hooks/useRequest"
import { toast } from "react-toastify"

export const SwitchPage = () => {
  const {makeRequest} = useRequest()
  const [checked, setChecked] = useState(false)
  const RequestToMentor = async ()=>{
    const res = await makeRequest('/request-to-mentor', {
      mentor:''
    });
    if(res.response) toast.success(res.response.message);
  }

useEffect(()=>{
if(checked){
 RequestToMentor()
}
},[checked])
  return (
    <Switch.Root
      checked={checked}
      onCheckedChange={(e) => setChecked(e.checked)}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  )
}
