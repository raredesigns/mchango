import { KEFlag, TZFlag, UGFlag } from "../components";

export const countryCodes = [
  {
    label: "+255 Tanzania",
    value: "+255",
    flag: <TZFlag />,
    country: "Tanzania",
  },
  {
    label: "+254 Kenya",
    value: "+254",
    flag: <KEFlag />,
    country: "Kenya",
  },
  {
    label: "+256 Uganda",
    value: "+256",
    flag: <UGFlag />,
    country: "Uganda",
  },
];

export const costPerMessage = 35

export const messageTemplates = [
  {
    label: "Unfinished Pledges",
    value: `Habari {firstName},\n Asante kwa ahadi yako ya {ahadi}. Tunapenda kukukumbusha kumalizia ahadi yako iliyobakia ya {deni}.`
  },
  {
    label: "Finished Pledges",
    value: `Habari {firstName},\n Asante kwa kumaliza kulipia ahadi yako ya {ahadi}.` 
  },
  {
    label: "Generic",
    value: `Habari {firstName},\n Asante kwa ahadi yako ya {ahadi}.`
  }
]