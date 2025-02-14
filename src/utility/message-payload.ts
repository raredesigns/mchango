import { messageTemplates } from "../constants";
import {currencyNumber} from "./currency-numbers";

type Pledger = {
    id: number;
    firstName: string;
    lastName: string;
    countryCode: string | null;
    mobile: string;
    amount: number;
    paid: number;
    balance: number;
};

type MessagePayload = { phoneNumbers: string; message: string }[];

export const createMessagePayload = (selectedPledgers: Pledger[]): MessagePayload => {
    const template = messageTemplates[2].value

    return selectedPledgers.map((pledger) => {
        const {firstName, countryCode, mobile, amount, balance} = pledger;

        // Replace placeholders in the template with actual data
        const message = template
            .replace("{firstName}", firstName)
            .replace("{ahadi}", currencyNumber(amount))
            .replace("{deni}", currencyNumber(balance));

        // Combine country code and mobile to form a full phone number
        //FIX ME - Deal with this typescript error
        const phoneNumbers: string = [`${countryCode || ""}${mobile}`];

        return {phoneNumbers, message};
    });
}
