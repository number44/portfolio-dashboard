import { useState } from "react";
import { Switch } from "@headlessui/react";
import Sun from "../icons/Sun";

const Toggle = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={` border-2 border-red-800 transform transition ease-in-out duration-200 ${
                enabled ? "bg-grey-600" : "bg-gray-600"
            } relative inline-flex items-center h-8 rounded-full w-14`}
        >
            x y<span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? " absolute translate-x-6" : "translate-x-3"
                } inline-block w-4 h-4   rounded-full flex-center transform transition ease-in-out duration-200`}
            >
                <Sun />
            </span>
        </Switch>
    );
};

export default Toggle;
