import {Button, Flex, HStack, Tabs, Text } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import { BenefitsPoints } from "./Benefits";
import { BonusPoints } from "./BonusPoints";
 
export const AdminBenfitsTabPanels = () => {
    
  return (
    <Tabs.Root bg="#F5F6FA" defaultValue="Benefits">
      <Flex alignItems={'center'} pt={{base:1,md:0}} justifyContent={"space-between"}>
        {/* Tabs */}
        <Tabs.List whiteSpace={'nowrap'}>
          <Tabs.Trigger
          _selected={{color:'#2B362F'}}
          fontSize={{base:10,md:13}}
          color={'#999999'}
          value="Benefits">
            Benefits
          </Tabs.Trigger>
          
          <Tabs.Trigger 
           _selected={{color:'#2B362F'}}
          color={'#999999'}
          fontSize={{base:10,md:13}}
          value="Organization">
             Bonus Points
          </Tabs.Trigger>
         
        </Tabs.List>
         
          
      </Flex>

     
      {/* Tab Contents */}
      <Tabs.Content value="Benefits">
         <BenefitsPoints/>
      </Tabs.Content>
      <Tabs.Content value="Organization">
        <BonusPoints />
      </Tabs.Content>
    </Tabs.Root>
  );
};
