import { Dialogs, Utils, Application } from '@nativescript/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DialerScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Dialer">,
};

export function DialerScreen({ navigation }: DialerScreenProps) {
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const addDigit = (digit: string) => {
        setPhoneNumber(prev => {
            console.log("Adding digit:", digit, "New number:", prev + digit);
            return prev + digit;
        });
    };

    const deleteDigit = () => {
        setPhoneNumber(prev => prev.slice(0, -1));
    };

    const makeCall = () => {
        if (phoneNumber) {
            Utils.openUrl(`tel:${phoneNumber}`);
        } else {
            Dialogs.alert("Please enter a phone number");
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
    React.useEffect(() => {
        console.log("Updated phoneNumber:", phoneNumber);
    }, [phoneNumber]);

    return (
        <gridLayout rows="auto,*,auto,auto" className={isDarkMode ? "dark" : ""}>

            {/* Header Section */}
            <gridLayout row={0} columns="auto,*,auto" className="p-4 bg-gray-100 dark:bg-gray-800">
                <button col={0} className="text-xl p-2" onTap={toggleDarkMode}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
                <label col={1} className="text-2xl text-center dark:text-white">
                    {phoneNumber || "Phone"}
                </label>
                <button col={2} className="text-xl p-2"
                    onTap={() =>
                        Dialogs.action({
                            message: "Options",
                            cancelButtonText: "Cancel",
                            actions: ["Save Contact", "Block Number", "Call History", "Contacts"]
                        }).then(result => {
                            switch (result) {
                                case "Call History":
                                    navigation.navigate("CallHistory");
                                    break;
                                case "Contacts":
                                    navigation.navigate("Contacts");
                                    break;
                                case "Save Contact":
                                    Dialogs.prompt({
                                        title: "Save Contact",
                                        message: "Enter contact name",
                                        okButtonText: "Save",
                                        cancelButtonText: "Cancel"
                                    });
                                    break;
                                case "Block Number":
                                    Dialogs.alert("Number blocked");
                                    break;
                            }
                        })
                    }>
                    ⋮
                </button>
            </gridLayout>

            {/* Display Area (Moved Higher) */}
            <stackLayout row={1} className="p-4 mt-6">
                <label className="text-4xl text-center dark:text-white">
                    {phoneNumber.length > 0 ? phoneNumber : "Enter number"}
                </label>
            </stackLayout>

            {/* Dialpad (Moved Higher) */}
            <gridLayout row={2} rows="auto,auto,auto,auto" columns="*,*,*" className="bg-gray-100 dark:bg-gray-800 p-4 mt-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((digit, index) => (
                    <button
                        key={digit}
                        row={Math.floor(index / 3)}
                        col={index % 3}
                        className="text-2xl p-6 m-1 bg-white dark:bg-gray-700 dark:text-white rounded-full"
                        onTap={() => addDigit(digit)}
                    >
                        {digit}
                    </button>
                ))}
            </gridLayout>

            {/* Call & Delete Buttons (Separate & Centered) */}
            <gridLayout row={3} columns="*,auto,*" className="mt-6 mb-6">
                {/* Empty column for alignment */}
                <stackLayout col={0} />

                {/* Green Call Button (Centered in the Screen) */}
                <stackLayout col={1} className="flex items-center justify-center">
                    <button
                        className="w-20 h-20 bg-green-500 text-white text-4xl rounded-full flex items-center justify-center shadow-lg"
                        onTap={makeCall}
                    >
                        📞
                    </button>
                </stackLayout>

                {/* Delete (⌫) Button - Only Shows When Number is Entered */}
                {phoneNumber && (
                    <stackLayout col={2} className="flex items-center justify-center">
                        <button
                            className="w-16 h-16 bg-gray-300 dark:bg-gray-600 text-black dark:text-white text-3xl rounded-full flex items-center justify-center shadow"
                            onTap={deleteDigit}
                        >
                            ⌫
                        </button>
                    </stackLayout>
                )}
            </gridLayout>
        </gridLayout>


    );
}
