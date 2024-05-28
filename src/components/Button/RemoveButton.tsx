import React from "react";

function RemoveButon(props: { onClick: () => void }) {
    return <button className="bg-red-500 text-white py-1 px-3 mt-2 rounded"
                   onClick={props.onClick}>Remove Subfield
    </button>;
}
export default RemoveButon;