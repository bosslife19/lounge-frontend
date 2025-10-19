import { Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRequest } from "../../../hooks/useRequest";
import { toast } from "react-toastify";
import axiosClient from "../../../axiosClient";

export const SwitchPage = ({ coffee, setIsOpen }) => {
  const { makeRequest } = useRequest();
  const [checked, setChecked] = useState(false);
  const [noApi, setNoApi] = useState(false);

  useEffect(() => {
    const checkIfmentorRequested = async () => {
      const res = await axiosClient.get("/check-mentor-requested");
      if (res.data.requested) {
        setChecked(true);
        setNoApi(true);
      }
    };
    const checkIfOptedInForCoffee = async () => {
      const res = await axiosClient.get("/check-opted-in-coffee-roulette");
      if (res.data.optedIn) {
        setChecked(true);
        setNoApi(true);
      }
    };
    if (!coffee) {
      checkIfmentorRequested();
    } else {
      checkIfOptedInForCoffee();
    }
  }, []);

  const optInForRoulette = async () => {
    const res = await makeRequest("/opt-in", { mentor: "" });
    if (res.response)
      return toast.success(
        "You have successfully opted in for this week's coffee roulette"
      );
    if (res.error) return;
    return;
  };
  const RequestToMentor = async () => {
    const res = await makeRequest("/request-to-mentor", {
      mentor: "",
    });
    if (res.response) toast.success(res.response.message);
    setIsOpen(true);
  };

  useEffect(() => {
    if (checked && !coffee && !noApi) {
      RequestToMentor();
    }
    if (checked && coffee && !noApi) {
      optInForRoulette();
    }
  }, [checked]);
  return (
    <Switch.Root
      size={{ base: "xs", md: "sm" }}
      checked={checked}
      onCheckedChange={(e) => setChecked(e.checked)}
    >
      <Switch.HiddenInput />
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label />
    </Switch.Root>
  );
};
