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
    label: "SMS 1",
    value: `Habari {firstName},\nKamati ya {eventType} ya ndugu na rafiki yetu, {groomBride} itakayofanyika tarehe {eventDate} inapenda kukukumbusha kumalizia au kupunguza mchango wako wa {deni}.\nWewe ni wa muhimu katika kufanikisha shughuli hii. Mungu akubariki.\n{mobile}: {mobileNumber} - {mobileName}\n{bank}: {bankAccount} - {bankName}.\nAhsante sana.`
  },
  {
    label:"SMS 2",
    value: `Habari {firstName},\nKamati ya {eventType} ya ndugu na rafiki yetu, {groomBride} itakayofanyika tarehe {eventDate} inapenda kukukumbusha kumalizia au kupunguza mchango wako wa {deni}.\nTumebaki na siku {daysToEvent} tu mpaka siku ya {eventType}.\nWewe ni wa muhimu katika kufanikisha shughuli hii. Mungu akubariki.\n{mobile}: {mobileNumber} - {mobileName}\n{bank}: {bankAccount} - {bankName}.\nAhsante sana.`
  }
]